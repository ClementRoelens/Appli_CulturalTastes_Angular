import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './../../../core/services/auth.service';
import { Component, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { Album } from '../album.model';
import { AlbumService } from 'src/app/core/services/album.service';
import { OpinionService } from 'src/app/core/services/opinion.service';
import { PresentationDialogComponent } from 'src/app/core/components/presentation-dialog/presentation-dialog.component';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  @HostBinding("device") device!: string;
  @ViewChild("snavLeft") sidebarLeft!: MatSidenav;
  @ViewChild("snavRight") sidebarRight!: MatSidenav;

  user$!: Observable<User>;
  albums$!: Observable<Album[]>;
  selectedAlbum$!: Observable<Album>;
  loading$!: Observable<boolean>;
  genres$!: Observable<string[]>;
  isLiked$!: Observable<boolean>;
  isLikedOrDisliked$!: Observable<{ liked: boolean, disliked: boolean }>;
  activeGenres$!: Observable<string[]>;
  failSearch$!: Observable<boolean>;
  
  searchedForm!: FormControl;

  itemType!:string;
  userId!: string;
  isLogged!: boolean;
  seekedId!: string;
  seekedGenre!: string;
  seekedAuthor!: string;
  searchedValue!:string;

  constructor(
    private authService:AuthService,
    private albumService:AlbumService,
    private opinionService:OpinionService,
    private dialog:MatDialog,
    private snackbar:MatSnackBar,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.checkWidth(window.innerWidth);
    this.itemType = "album";
    this.seekedAuthor = "";
    this.seekedGenre = "";
    this.seekedId = this.route.snapshot.params["id"];
    this.initUserObservables();
    this.initAlbumObservables();
    this.initOpinionObservables();
    this.initGenreObservables();
    this.initLikedAndDislikedObservable();
    this.albumService.getGenres();
    this.albumService.getAlbums(this.seekedId === undefined);
    if (this.seekedId !== undefined) {
      this.albumService.getOneAlbum(this.seekedId);
    }
    this.searchedForm = new FormControl<string>("");
    this.failSearch$ = this.albumService.failSearch$;
    this.failSearch$.pipe(
      tap(res=>console.log("failSearch mis à jour : "+res))
    ).subscribe();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.checkWidth(event.target.innerWidth);
  }

  checkWidth(width: number) {
    if (width <= 900) {
      this.device = "mobile-only";
    } else {
      this.device = "desktop-only";
    }
  }

  private initUserObservables() {
    this.authService.user$.pipe(
      tap(user => this.isLogged = user.username ? true : false),
      tap(user => this.userId = user._id ? user._id : "")
    ).subscribe();
    this.user$ = this.authService.user$;
  }

  private initAlbumObservables() {
    this.albums$ = this.albumService.albums$;
    this.selectedAlbum$ = this.albumService.selectedAlbum$;
  }

  private initOpinionObservables() {
    this.selectedAlbum$.pipe(
      tap(album => this.opinionService.getOpinions(album.opinionsId))
    ).subscribe();
  }

  private initGenreObservables() {
    this.genres$ = this.albumService.genres$;
    const genres = this.genres$;
    const album = this.selectedAlbum$;

    this.activeGenres$ = combineLatest([
      genres,
      album
    ]).pipe(
      map(([genres, album]) => {
        let activeGenres: string[] = [];
        genres.forEach(genre => {
          if (album.genres.includes(genre)) {
            activeGenres.push(genre);
          }
        });
        return activeGenres;
      })
    );
  }

  private initLikedAndDislikedObservable() {
    const user = this.user$;
    const album = this.selectedAlbum$;

    this.isLikedOrDisliked$ = combineLatest([
      user,
      album
    ]).pipe(
      map(([user, album]) => {
        if (this.isLogged && album._id) {
          const isLiked = user.likedAlbumsId.includes(album._id);
          const isDisliked = user.dislikedAlbumsId.includes(album._id);
          return {
            liked: isLiked,
            disliked: isDisliked
          }
        }
        else {
          return {
            liked: false,
            disliked: false
          }
        }
      })
    );
  }

  getAlbumsFromOneAuthor(author: string) {
    this.searchedValue = "";
    this.albumService.getAlbumsFromOneAuthor(author);
    this.seekedAuthor = author;
    this.seekedGenre = "";
  }

  getOneAlbum(id: string) {
    this.albumService.getOneAlbum(id);
    if (this.device === "mobile-only") {
      this.sidebarLeft.close();
    }
  }

  getAlbumsFromOneGenre(genre: string) {
    this.searchedValue = "";
    this.albumService.getAlbumsFromOneGenre(genre);
    this.seekedGenre = genre;
    this.seekedAuthor = "";
    if (this.device === "mobile-only"){
      this.sidebarRight.close();
    }    
  }

  swipeEvent(event: any) {
    if (event.deltaX > 40) {
      this.sidebarLeft.toggle();
      if (this.device === "mobile-only") {
        const lastVisit = localStorage.getItem("alreadyVisitedFullList");
        let timeDifference = 0;
        if (lastVisit) {
          timeDifference = Date.now() - parseInt(lastVisit);
        }
        if (!lastVisit || timeDifference >= 604800000) {
          let dialogRef = this.dialog.open(PresentationDialogComponent, { hasBackdrop: true, data: "full-list" });
          dialogRef.afterClosed().subscribe(() => {
            localStorage.setItem("alreadyVisitedFullList", Date.now().toString());
          });
        }
      }
    } else if (event.deltaX < -40) {
      this.sidebarRight.toggle();
    }
  }

  search(value:string) {
    if (value === ""){
      this.snackbar.open("Entrez un mot à rechercher...", undefined, { duration: 1500 });
    } else {
      this.albumService.search(value.toLowerCase());
      this.searchedValue = value;
    }
  } 
}

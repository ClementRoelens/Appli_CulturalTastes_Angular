import { SwipeToolTipComponentComponent } from './../../../core/components/swipe-tool-tip-component/swipe-tool-tip-component.component';
import { MatDialog } from '@angular/material/dialog';
import { OpinionService } from './../../../shared/opinion.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../../core/auth.service';
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';
import { combineLatest, map, Observable, take, tap } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { Film } from '../film.model';
import { FilmService } from '../film.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmComponent implements OnInit {

  @HostBinding('device') device!: string;
  @ViewChild('snavLeft') sidebarLeft!: MatSidenav;
  @ViewChild('snavRight') sidebarRight!: MatSidenav;

  user$!: Observable<User>;
  films$!: Observable<Film[]>;
  selectedFilm$!: Observable<Film>;
  loading$!: Observable<boolean>;
  genres$!: Observable<string[]>;
  isLiked$!: Observable<boolean>;
  isLikedOrDisliked$!: Observable<{ liked: boolean, disliked: boolean }>;
  activeGenres$!: Observable<string[]>;

  itemType!:string;
  userId!: string;
  isLogged!: boolean;
  seekedId!: string;

  constructor(
    private filmService: FilmService,
    private authService: AuthService,
    private opinionService : OpinionService,
    private route: ActivatedRoute,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.checkWidth(window.innerWidth);
    this.itemType='film'
    this.seekedId = this.route.snapshot.params['id'];
    this.initUserObservables();
    this.initFilmObservables();
    this.initOpinionObservables();
    this.initGenreObservables();
    this.initLikedAndDislikedObservable();
    this.filmService.getGenres();
    this.filmService.getFilms(this.seekedId === undefined);
    this.swipeTooltip();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWidth(event.target.innerWidth);
  }

  checkWidth(width: number) {
    if (width <= 900) {
      this.device = 'mobile-only';
    } else {
      this.device = 'desktop-only';
    }
  }

  private initUserObservables() {
    this.authService.user$.pipe(
      tap(user => this.isLogged = user.username ? true : false),
      tap(user => this.userId = user._id ? user._id : '')
    ).subscribe();
    this.user$ = this.authService.user$;
  }

  private initFilmObservables() {
    this.films$ = this.filmService.films$;
    this.selectedFilm$ = this.filmService.selectedFilm$;

    const loadingFilms = this.filmService.loadingFilms$;
    const loadingGenres = this.filmService.loadingGenres$;
    this.loading$ = combineLatest([
      loadingFilms,
      loadingGenres
    ]).pipe(
      map(([loadingFilms, loadingGenres]) => loadingFilms || loadingGenres)
    );
  }

  private initOpinionObservables(){
    this.selectedFilm$.pipe(
      tap(film => this.opinionService.getOpinions(film.opinionsId))
    ).subscribe();
  }

  private initGenreObservables() {
    this.genres$ = this.filmService.genres$;
    const genres = this.genres$;
    const film = this.selectedFilm$;

    this.activeGenres$ = combineLatest([
      genres,
      film
    ]).pipe(
      map(([genres, film]) => {
        let activeGenres: string[] = [];
        genres.forEach(genre => {
          if (film.genres.includes(genre)) {
            activeGenres.push(genre);
          }
        });
        return activeGenres;
      })
    );
  }

  private initLikedAndDislikedObservable() {
    const user = this.user$;
    const film = this.selectedFilm$;

    this.isLikedOrDisliked$ = combineLatest([
      user,
      film
    ]).pipe(
      map(([user, film]) => {
        if (this.isLogged && film._id) {
          const isLiked = user.likedFilmsId.includes(film._id);
          const isDisliked = user.dislikedFilmsId.includes(film._id);
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

  getFilmsFromOneAuthor(author: string) {
    this.filmService.getFilmsFromOneAuthor(author);
  }

  getOneFilm(id: string) {
    this.filmService.getOneFilm(id);
    if (this.device === "mobile-only"){
      this.sidebarLeft.close();
    }
  }

  getFilmsFromOneGenre(genre: string) {
    this.filmService.getFilmsFromOneGenre(genre);
  }

  swipeEvent(event:any){
    if (event.deltaX > 40){
      this.sidebarLeft.toggle();
    } else if (event.deltaX < -40){
      this.sidebarRight.toggle();
    }
  }

  swipeTooltip(){
    if (this.device === "mobile-only"){
      const lastVisit = localStorage.getItem("alreadyVisited");
      let timeDifference = 0;
      if (lastVisit){
        timeDifference = Date.now()- parseInt(lastVisit);
      }
      if (!lastVisit || timeDifference >= 604800000){
        let dialogRef = this.dialog.open(SwipeToolTipComponentComponent,{hasBackdrop:true});
        dialogRef.afterClosed().subscribe(()=>{
          localStorage.setItem("alreadyVisited",Date.now().toString());
        });
      }
    }
  }
}
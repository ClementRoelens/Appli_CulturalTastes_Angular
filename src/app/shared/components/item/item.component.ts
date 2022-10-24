import { NewOpinionComponent } from './../new-opinion/new-opinion.component';
import { SharedService } from './../../shared.service';
import { OpinionService } from './../../opinion.service';
import { Opinion } from './../../models/opinion.model';
import { environment } from './../../../../environments/environment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from 'src/app/feature/film/film.model';
import { Game } from 'src/app/feature/game/game.model';
import { Album } from 'src/app/feature/music/album.model';
import { Observable, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SigninComponent } from 'src/app/core/components/signin/signin.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  opinions$!:Observable<Opinion[]>;

  @Input() item!: Film | Game | Album;
  @Input() itemType!:string;
  @Input() isLikedOrDisliked!: { liked: boolean, disliked: boolean };
  @Input() likedOpinionsId!: string[];
  @Input() userId!:string;
  @Input() isLogged!:boolean;

  likedIcon!: string;
  dislikedIcon!: string;
  imageUrl!: string;
  isOpinionLiked!: boolean;

  @Output() authorRequested = new EventEmitter<string>();

  constructor(
    private opinionService:OpinionService,
    private sharedService : SharedService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.opinions$ = this.opinionService.opinions$.pipe(
      tap(()=>console.log('ItemComponent : récupération des opinions'))
    );
  }

  ngOnChanges() {
    console.log('ItemonChanges : ' + this.item.title);
    this.imageUrl = `${environment.apiUrl}/${this.item.imageUrl}`;
    this.likedIcon = this.isLikedOrDisliked.liked ? "./assets/thumbup_done.png" : "./assets/thumbup.png";
    this.dislikedIcon = this.isLikedOrDisliked.disliked ? "./assets/thumbdown_done.png" : "./assets/thumbdown.png";
    this.opinionService.getOpinions(this.item.opinionsId);
  }

  likeOrDislike(action: string) {
    if (this.item._id) {
      if (!this.isLogged) {
        let snackBarRef = this.snackBar.open('Vous devez être connectés pour effectuer cette action', 'Se connecter', { duration: 4000 });
        snackBarRef.onAction().subscribe(() => {
          this.dialog.open(SigninComponent)
        });
      }
      else {
        this.sharedService.likeOrDislikeItem(this.item._id, 'film', this.userId, action);
      }
    }
  }

  addOpinion() {
    let dialogRef = this.dialog.open(NewOpinionComponent,{
      data : {
        userId : this.userId,
        itemId : this.item._id,
        itemType : this.itemType
      },
      width:'450px',
      height:'280px'
    });
  }

  opinionCheck(id: string) {
    this.isOpinionLiked = (this.likedOpinionsId.includes(id)) ? true : false;
  }

  getItems(author: string) {
    this.authorRequested.emit(author);
  }

  likeOpinion(id:string){
    this.sharedService.likeOpinion(id,this.userId);
  }


}

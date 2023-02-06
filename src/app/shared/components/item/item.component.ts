import { OpinionComponent } from './../opinion/opinion.component';
import { SignupComponent } from './../../../core/components/signup/signup.component';
import { SigninOrSignupComponent } from './../../signin-or-signup/signin-or-signup.component';
import { CreateOrModifyOpinionComponent } from './../create-or-modify-opinion/create-or-modify-opinion.component';
import { NewOpinionComponent } from './../new-opinion/new-opinion.component';
import { SharedService } from './../../shared.service';
import { Opinion } from './../../models/opinion.model';
import { environment } from './../../../../environments/environment';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from 'src/app/feature/film/film.model';
import { Game } from 'src/app/feature/game/game.model';
import { Album } from 'src/app/feature/music/album.model';
import { MatDialog } from '@angular/material/dialog';
import { SigninComponent } from 'src/app/core/components/signin/signin.component';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent implements OnInit {

  @Input() item!: Film | Game | Album;
  @Input() itemType!: string;
  @Input() isLikedOrDisliked!: { liked: boolean, disliked: boolean };
  @Input() likedOpinionsId!: string[];
  @Input() user!: User;
  @Input() isLogged!: boolean;
  @Input() device!: string;

  likedIcon!: string;
  dislikedIcon!: string;
  imageUrl!: string;
  isOpinionLiked!: boolean;
  existingOpinion!: Opinion | null;

  @Output() authorRequested = new EventEmitter<string>();

  constructor(
    private sharedService: SharedService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log("Item focus : " + this.item._id);
    // Pour le dev
    // this.imageUrl = `${environment.apiUrl}/film/${this.item.imageUrl}`;
    // Une fois déployé sur Azure
    this.imageUrl = `${environment.imageStorageUrl}/${this.item.imageUrl}`;
    this.likedIcon = this.isLikedOrDisliked.liked ? "./assets/thumbup_done.png" : "./assets/thumbup.png";
    this.dislikedIcon = this.isLikedOrDisliked.disliked ? "./assets/thumbdown_done.png" : "./assets/thumbdown.png";
  }

  opinionExists(opinion: Opinion | null) {
    this.existingOpinion = opinion;
  }

  likeOrDislike(action: string) {
    if (this.item._id) {
      if (!this.isLogged) {
        this.needLogin();
      }
      else {
        this.sharedService.likeOrDislikeItem(this.item._id, this.itemType, this.user._id, action);
      }
    }
  }

  opinionClick() {
    if (this.device === "desktop-only" || this.item.opinionsId.length === 0) {
      this.opinionNewOrEdit();
    } else if (this.device === "mobile-only") {
      let dialogRef = this.dialog.open(OpinionComponent);
      const opinionComponentInstance = dialogRef.componentInstance as OpinionComponent;
      opinionComponentInstance.opinionLiked.subscribe(id => {
        this.likeOpinion(id)
      });
      opinionComponentInstance.opinionWrited.subscribe(result => {
        if (result){
          this.opinionNewOrEdit();
        }
      });
      opinionComponentInstance.opinionExists.subscribe(opinion => {
        this.opinionExists(opinion);
      });
    }
  }

  opinionCheck(id: string) {
    this.isOpinionLiked = (this.likedOpinionsId.includes(id)) ? true : false;
  }

  getItems(author: string) {
    this.authorRequested.emit(author);
  }

  likeOpinion(id: string) {
    if (!this.isLogged) {
      this.needLogin();
    }
    else {
      this.sharedService.likeOpinion(id, this.user._id);
    }
  }

  private writeOpinion(newOne: boolean) {
    let data = {};
    if (newOne) {
      data = {
        userId: this.user._id,
        username: this.user.username,
        itemId: this.item._id,
        itemType: this.itemType
      }
    } else {
      data = {
        existingOpinionContent: this.existingOpinion?.content,
        opinionId: this.existingOpinion?._id
      };
    }
    let options = {
      data,
      width: '450px',
      height: '280px'
    };
    // if (this.device === "mobile-only"){
    //   options.height = '350px';
    // }
    let dialogRef = this.dialog.open(NewOpinionComponent, options);
  }

  private opinionNewOrEdit() {
    if (!this.isLogged) {
      this.needLogin();
    } else {
      if (this.existingOpinion !== null && this.item.opinionsId.length > 0) {
        let opinionId = this.existingOpinion._id;
        let dialogRef = this.dialog.open(CreateOrModifyOpinionComponent, { width: '460px', height: '235px' });
        dialogRef.afterClosed().subscribe(result => {
          if (result === "modify") {
            this.writeOpinion(false);
          } else if (result === "erase") {
            this.eraseOpinion(opinionId);
          }
        })
      } else {
        this.writeOpinion(true);
      }
    }
  }
  private needLogin() {
    let dialogRef = this.dialog.open(SigninOrSignupComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === "signin") {
        this.dialog.open(SigninComponent)
      } else if (result === "signup") {
        this.dialog.open(SignupComponent);
      }
    });
  }

  private eraseOpinion(id: string) {
    console.log("eraseOpinion(), appel du service");
    this.sharedService.eraseOpinion(id, this.user._id, this.item._id);
  }
}

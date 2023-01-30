import { CreateOrModifyOpinionComponent } from './../create-or-modify-opinion/create-or-modify-opinion.component';
import { NewOpinionComponent } from './../new-opinion/new-opinion.component';
import { SharedService } from './../../shared.service';
import { OpinionService } from './../../opinion.service';
import { Opinion } from './../../models/opinion.model';
import { environment } from './../../../../environments/environment';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from 'src/app/feature/film/film.model';
import { Game } from 'src/app/feature/game/game.model';
import { Album } from 'src/app/feature/music/album.model';
import { Observable, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  likedIcon!: string;
  dislikedIcon!: string;
  imageUrl!: string;
  isOpinionLiked!: boolean;
  existingOpinion!: Opinion | null;

  @Output() authorRequested = new EventEmitter<string>();

  constructor(
    private opinionService: OpinionService,
    private sharedService: SharedService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log("Item focus : " + this.item._id);
    this.imageUrl = `${environment.apiUrl}/film/${this.item.imageUrl}`;
    this.likedIcon = this.isLikedOrDisliked.liked ? "./assets/thumbup_done.png" : "./assets/thumbup.png";
    this.dislikedIcon = this.isLikedOrDisliked.disliked ? "./assets/thumbdown_done.png" : "./assets/thumbdown.png";
  }

  opinionExists(opinion: Opinion | null) {
    this.existingOpinion = opinion;
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
        this.sharedService.likeOrDislikeItem(this.item._id, this.itemType, this.user._id, action);
      }
    }
  }

  modifyOrCreateOpinion() {
    if (this.existingOpinion !== null && this.item.opinionsId.length > 0) {
      let opinionId = this.existingOpinion._id;
      let dialogRef = this.dialog.open(CreateOrModifyOpinionComponent, { width: '460px', height: '235px' });
      dialogRef.afterClosed().subscribe(result => {
        if (result == "modify") {
          this.writeOpinion(false);
        } else if (result == "erase") {
          this.eraseOpinion(opinionId);
        }
      })
    } else {
      this.writeOpinion(true);
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
    let dialogRef = this.dialog.open(NewOpinionComponent, {
      data,
      width: '450px',
      height: '280px'
    });
  }

  private eraseOpinion(id: string) {
    console.log("eraseOpinion(), appel du service");
    this.sharedService.eraseOpinion(id, this.user._id, this.item._id);
  }

  opinionCheck(id: string) {
    this.isOpinionLiked = (this.likedOpinionsId.includes(id)) ? true : false;
  }

  getItems(author: string) {
    this.authorRequested.emit(author);
  }

  likeOpinion(id: string) {
    this.sharedService.likeOpinion(id, this.user._id);
  }


}

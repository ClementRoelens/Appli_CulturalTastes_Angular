import { environment } from './../../../../environments/environment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from 'src/app/feature/film/film.model';
import { Game } from 'src/app/feature/game/game.model';
import { Album } from 'src/app/feature/music/album.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() item!: Film | Game | Album;

  isLiked!: boolean;
  isDisliked!: boolean;
  likedIcon!: string;
  dislikedIcon!: string;
  imageUrl!: string;
  seekedId!: string;
  isIdSeeked!: boolean;

  @Output() likedOrDisliked = new EventEmitter<string>();

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.likedIcon = "./assets/thumbup.png";
    this.dislikedIcon = "./assets/thumbdown.png";
    this.seekedId = this.route.snapshot.params["opinionId"];
    this.isIdSeeked = true;
    this.imageUrl = `${environment.apiUrl}/${this.item.imageUrl}`;
  }

  likeOrDislike(action: string) {
    this.likedOrDisliked.emit(action);
  }

  addOpinion() {

  }

  getWorks(author: string) {

  }

}

import { ItemComponent } from './../item/item.component';
import { MatDialog } from '@angular/material/dialog';
import { Game } from './../../../feature/game/game.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/feature/film/film.model';
import { Observable, map } from 'rxjs';
import { Album } from 'src/app/feature/music/album.model';

@Component({
  selector: 'app-full-list',
  templateUrl: './full-list.component.html',
  styleUrls: ['./full-list.component.scss']
})
export class FullListComponent implements OnInit {

  items$!:Observable<Film[] | Game[] | Album[]>;

  constructor(
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.items$ = this.route.data.pipe(
      map(data => data['items'])
    );
  }

  getEncodedAuthorUrl(author: string) {
    return encodeURI(`/author/${author}`);
  }
}

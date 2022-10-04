import { Component, Input, OnInit } from '@angular/core';
import { Film } from 'src/app/feature/film/film.model';
import { Game } from 'src/app/feature/game/game.model';
import { Album } from 'src/app/feature/music/album.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() item!: Film | Game |  Album;
  
  constructor() { }

  ngOnInit(): void {
  }

}

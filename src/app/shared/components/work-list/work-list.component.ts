import { Game } from './../../../feature/game/game.model';
import { Album } from './../../../feature/music/album.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Film } from 'src/app/feature/film/film.model';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.scss']
})
export class WorkListComponent implements OnInit {

  @Input() works!: Film[] | Album[] | Game[] | any[];
  @Output() itemSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  itemSelection(id: string) {
    this.itemSelected.emit(id);
  }
}

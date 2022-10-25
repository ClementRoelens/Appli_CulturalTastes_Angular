import { Game } from '../../../feature/game/game.model';
import { Album } from '../../../feature/music/album.model';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Film } from 'src/app/feature/film/film.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemListComponent implements OnInit {

  @Input() items!: Film[] | Album[] | Game[] | any[];

  @Output() requestedItem = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  itemSelection(id: string) {
    this.requestedItem.emit(id);
    
  }
}

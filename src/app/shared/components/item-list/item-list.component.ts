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
  @Input() itemType!:string;
  @Input() device!:string;
  @Input() selectedAuthor!:string;
  @Input() selectedGenre!:string;

  @Output() requestedItem = new EventEmitter<string>();

  listTitle!:string;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    let itemNumber = (this.device === "mobile-only") ? 15 : 20;
    let randomItems = false;
    if (this.items.length > itemNumber || (this.selectedAuthor === "" && this.selectedGenre === "")){
      randomItems = true;
    } 
    if (this.items.length < itemNumber){
      itemNumber = this.items.length;
    }
    this.listTitle = `${itemNumber} ${this.itemType}`;
    if (itemNumber > 1){
      this.listTitle += "s";
      if (randomItems){
        this.listTitle += " aléatoires";
      }
    }
    if (this.selectedAuthor !== ""){
      this.listTitle += " de " + this.selectedAuthor;
    } else if (this.selectedGenre !== ""){
      this.listTitle += " dans le genre " + this.selectedGenre;
    }
  }

  itemSelection(id: string) {
    this.requestedItem.emit(id);
    
  }
}

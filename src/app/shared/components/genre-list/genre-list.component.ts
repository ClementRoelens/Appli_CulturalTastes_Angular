import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenreListComponent implements OnInit {

  @Input() genres!:string[];
  @Input() activeGenres!:string[];

  @Output() genreSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  genreSelection(genre:string){
    this.genreSelected.emit(genre);
  }
}

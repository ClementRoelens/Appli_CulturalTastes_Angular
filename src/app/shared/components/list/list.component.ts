import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() items!: any[];
  @Input() isGenre!:boolean;

  constructor() { }

  ngOnInit(): void {
    console.log('list init avec items : '+this.items);
    console.log('list init, isGenre : '+this.isGenre);
  }

  ngOnChanges(){
    console.log('list changes avec items : '+this.items);
  }

  selection(id:string){
    console.log(id);
  }

  genreSelection(genre:string){
    console.log(genre);
  }
}

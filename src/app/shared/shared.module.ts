import { ReactiveFormsModule } from '@angular/forms';
import { NewOpinionComponent } from './components/new-opinion/new-opinion.component';
import { OpinionService } from './opinion.service';
import { SharedService } from './shared.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './components/item/item.component';
import { OpinionComponent } from './components/opinion/opinion.component';
import { UserComponent } from './components/user/user.component';
import { MaterialModule } from './material.module';
import { GenreListComponent } from './components/genre-list/genre-list.component';
import { ItemListComponent } from './components/item-list/item-list.component';

@NgModule({
  declarations: [
    OpinionComponent,
    NewOpinionComponent,
    GenreListComponent,
    ItemListComponent,
    UserComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    OpinionComponent,
    NewOpinionComponent,
    GenreListComponent,
    ItemListComponent,
    UserComponent,
    ItemComponent,
    MaterialModule,
    RouterModule
  ],
  providers:[
    SharedService,
    OpinionService
  ]
})
export class SharedModule { }

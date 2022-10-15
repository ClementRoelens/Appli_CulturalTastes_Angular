import { SharedService } from './shared.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './components/item/item.component';
import { OpinionComponent } from './components/opinion/opinion.component';
import { UserComponent } from './components/user/user.component';
import { MaterialModule } from './material.module';
import { GenreListComponent } from './components/genre-list/genre-list.component';
import { WorkListComponent } from './components/work-list/work-list.component';

@NgModule({
  declarations: [
    OpinionComponent,
    GenreListComponent,
    WorkListComponent,
    UserComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    OpinionComponent,
    GenreListComponent,
    WorkListComponent,
    UserComponent,
    ItemComponent,
    MaterialModule,
    RouterModule
  ],
  providers:[
    SharedService
  ]
})
export class SharedModule { }

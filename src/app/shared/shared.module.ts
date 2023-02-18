import { SigninOrSignupComponent } from './signin-or-signup/signin-or-signup.component';
import { CreateOrModifyOpinionComponent } from './components/create-or-modify-opinion/create-or-modify-opinion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewOpinionComponent } from './components/new-opinion/new-opinion.component';
import { OpinionService } from '../core/services/opinion.service';
import { SharedService } from '../core/services/shared.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './components/item/item.component';
import { OpinionComponent } from './components/opinion/opinion.component';
import { UserComponent } from './components/user/user.component';
import { MaterialModule } from './material.module';
import { GenreListComponent } from './components/genre-list/genre-list.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { FullListComponent } from './components/full-list/full-list.component';

@NgModule({
  declarations: [
    OpinionComponent,
    NewOpinionComponent,
    GenreListComponent,
    ItemListComponent,
    UserComponent,
    ItemComponent,
    CreateOrModifyOpinionComponent,
    SigninOrSignupComponent,
    FullListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    OpinionComponent,
    NewOpinionComponent,
    GenreListComponent,
    ItemListComponent,
    UserComponent,
    ItemComponent,
    CreateOrModifyOpinionComponent,
    SigninOrSignupComponent,
    FullListComponent,
    MaterialModule,
    RouterModule
  ],
  providers:[
    
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './components/item/item.component';
import { ListComponent } from './components/list/list.component';
import { OpinionComponent } from './components/opinion/opinion.component';
import { UserComponent } from './components/user/user.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    OpinionComponent,
    ListComponent,
    UserComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    OpinionComponent,
    ListComponent,
    UserComponent,
    ItemComponent,
    MaterialModule
  ]
})
export class SharedModule { }

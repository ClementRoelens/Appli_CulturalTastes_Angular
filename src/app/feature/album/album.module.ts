import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { AlbumRoutingModule } from './album-routing.module';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './components/album.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        AlbumComponent
    ],
    imports: [
        CommonModule,
        AlbumRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ],
    providers: [

    ],
    exports: [
        AlbumComponent
    ]
})
export class AlbumModule { }
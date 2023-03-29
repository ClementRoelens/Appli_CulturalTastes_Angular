import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { FilmComponent } from "./components/film.component";
import { FilmRoutingModule } from "./film-routing.module";
import { FilmService } from "../../core/services/film.service";
import { FilmResolver } from './film.resolver';

@NgModule({
    declarations: [
        FilmComponent
    ],
    imports: [
        CommonModule,
        FilmRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [
        FilmResolver
    ],
    exports:[
        FilmComponent
    ]
})
export class FilmModule { }
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { FilmComponent } from "./components/film.component";
import { FilmRoutingModule } from "./film.routing-module";
import { FilmService } from "./film.service";

@NgModule({
    declarations: [
        FilmComponent
    ],
    imports: [
        CommonModule,
        FilmRoutingModule,
        SharedModule
    ],
    providers: [
        FilmService
    ],
    exports:[
        FilmComponent
    ]
})
export class FilmModule { }
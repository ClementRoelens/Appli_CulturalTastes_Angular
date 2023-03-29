import { FilmResolver } from './film.resolver';
import { FullListComponent } from '../../shared/components/full-list/full-list.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FilmComponent } from "./components/film.component";

const routes: Routes = [
    { path: '', component: FilmComponent },
    { path: 'getAll', component: FullListComponent, resolve: { items: FilmResolver } },
    { path: ':method/:param', component: FullListComponent, resolve: { items: FilmResolver } },
    { path: ':id', component: FilmComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FilmRoutingModule { }
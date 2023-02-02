import { HomeComponent } from './feature/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {path:'',component:HomeComponent},
  // Pour le moment seuls les films sont disponbiles, on aura plus tard du lazy loading pour les deux autres modèles
  {path:'',loadChildren:()=>import('./feature/film/film.routing-module').then(m=>m.FilmRoutingModule)},
  // {path:'film',loadChildren:()=>import('./feature/film/film.routing-module').then(m=>m.FilmRoutingModule)},
  {path:'**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

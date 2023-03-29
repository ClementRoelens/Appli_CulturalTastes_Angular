import { HomeComponent } from './feature/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullListComponent } from './shared/components/full-list/full-list.component';
import { FilmResolver } from './feature/film/film.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // Pour le moment seuls les films sont disponbiles, on aura plus tard du lazy loading pour les deux autres modules
  // { path: '', loadChildren: () => import('./feature/film/film-routing.module').then(m => m.FilmRoutingModule) },
  { path: 'film', loadChildren: () => import('./feature/film/film-routing.module').then(m => m.FilmRoutingModule) },
  { path: 'album', loadChildren: () => import('./feature/album/album-routing.module').then(m => m.AlbumRoutingModule) }
  // { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

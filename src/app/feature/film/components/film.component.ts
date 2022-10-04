import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { Film } from '../film.model';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FilmComponent implements OnInit {

  films$!:Observable<Film[]>;
  loading$!:Observable<boolean>;
  genres$!:Observable<string[]>;
  selectedFilm!:Film;
  
  constructor(private filmService:FilmService) { }

  ngOnInit(): void {
    console.log('Film Init');
    this.initObservables();
    this.filmService.getFilms();
    this.filmService.getGenres();
  }

  initObservables(){
    console.log("FIlm init observables");
    this.films$ = this.filmService.films$.pipe(
      tap(films=>{
        const rand = Math.round(Math.random() * (films.length - 1));
        this.selectedFilm = films[rand];
      })
    );
    this.genres$ = this.filmService.genres$;
    const loadingFilms = this.filmService.loadingFilms$;
    const loadingGenres = this.filmService.loadingGenres$;
    this.loading$ = combineLatest([
      loadingFilms,
      loadingGenres
    ]).pipe(
      map(([loadingFilms,loadingGenres]) => loadingFilms || loadingGenres)
    );
  }

}

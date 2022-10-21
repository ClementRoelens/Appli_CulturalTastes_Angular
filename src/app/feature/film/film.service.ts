import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, ReplaySubject, tap } from "rxjs";
import { Film } from "./film.model";
import { environment } from "src/environments/environment";

// const anonymousFilm: Film = new Film;
// const anonymouseFilmList : Film[] = new [anonymousFilm];

@Injectable()
export class FilmService {
    constructor(
        private http: HttpClient
    ) { }

    private _films$ = new ReplaySubject<Film[]>();
    get films$(): Observable<Film[]> {
        return this._films$;
    }
    private _selectedFilm$ = new ReplaySubject<Film>()
    get selectedFilm$(): Observable<Film> {
        return this._selectedFilm$;
    }

    private _genres$ = new BehaviorSubject<string[]>([]);
    get genres$(): Observable<string[]> {
        return this._genres$;
    }

    private _loadingFilms$ = new BehaviorSubject<boolean>(false);
    get loadingFilms$(): Observable<boolean> {
        return this._loadingFilms$;
    }
    private _loadingGenres$ = new BehaviorSubject<boolean>(false);
    get loadingGenres$(): Observable<boolean> {
        return this._loadingGenres$;
    }

    private setLoadingFilmsStatus(loading: boolean) {
        this._loadingFilms$.next(loading);
    }
    private setLoadingGenresStatus(loading: boolean) {
        this._loadingGenres$.next(loading);
    }

    getFilms(getOneRandom:boolean,urlP?: string) {
        console.log('filmService.getFilms lancé');
        console.log("getOneRandom : "+getOneRandom);
        this.setLoadingFilmsStatus(true);
        let url = `${environment.apiUrl}/film/`;
        if (urlP) {
            url += urlP;
        }
        else {
            url += 'getRandomFilms'
        }
        console.log('FilmService.getFilms : url = ' + url);
        this.http.get<Film[]>(url).pipe(
            tap(()=>console.log('filmsService : émission de films')),
            tap(films => {
                this._films$.next(films);
                if (getOneRandom){
                    console.log('FilmService : émission d\'un film random');
                    const rand = Math.round(Math.random() * (films.length - 1));
                    this._selectedFilm$.next(films[rand]);
                }
            }),
            tap(() => this.setLoadingFilmsStatus(false))
        ).subscribe();
    }

    getFilmsFromOneAuthor(author: string) {
        this.getFilms(true,`getRandomInOneAuthor/${author}`);
    }

    getFilmsFromOneGenre(genre: string) {
        this.getFilms(true,`getRandomInOneGenre/${genre}`);
    }

    getOneFilm(id?: string) {
        if (id) {
            this.http.get<Film>(`${environment.apiUrl}/film/getOneFilm/${id}`).pipe(
                tap(film => this._selectedFilm$.next(film))
            ).subscribe();
        }
    }

    getGenres() {
        this.setLoadingGenresStatus(true);
        this.http.get<string[]>(`${environment.apiUrl}/film/getGenres`).pipe(
            tap(genres => this._genres$.next(genres)),
            tap(() => this.setLoadingGenresStatus(false))
        ).subscribe();
    }
}
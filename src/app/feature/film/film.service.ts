import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Film } from "./film.model";
import { environment } from "src/environments/environment";

@Injectable()
export class FilmService {
    constructor(
        private http: HttpClient
    ) { }

    private _films$ = new BehaviorSubject<Film[]>([]);
    get films$(): Observable<Film[]> {
        return this._films$;
    }
    private _loadingFilms$ = new BehaviorSubject<boolean>(false);
    get loadingFilms$(): Observable<boolean> {
        return this._loadingFilms$;
    }
    private _loadingGenres$ = new BehaviorSubject<boolean>(false);
    get loadingGenres$(): Observable<boolean> {
        return this._loadingGenres$;
    }
    private _genres$ = new BehaviorSubject<string[]>([]);
    get genres$(): Observable<string[]> {
        return this._genres$;
    }
    private setLoadingFilmsStatus(loading: boolean) {
        this._loadingFilms$.next(loading);
    }

    private setLoadingGenresStatus(loading: boolean) {
        this._loadingGenres$.next(loading);
    }

    getFilms() {
        this.setLoadingFilmsStatus(true);
        this.http.get<Film[]>(`${environment.apiUrl}/film/getRandomFilms`).pipe(
            tap(films => this._films$.next(films)),
            tap(() => this.setLoadingFilmsStatus(false))
        ).subscribe();
    }

    getGenres() {
        this.setLoadingGenresStatus(true);
        this.http.get<string[]>(`${environment.apiUrl}/film/getGenres`).pipe(
            tap(genres => this._genres$.next(genres)),
            tap(() => this.setLoadingGenresStatus(false))
        ).subscribe();
    }
}
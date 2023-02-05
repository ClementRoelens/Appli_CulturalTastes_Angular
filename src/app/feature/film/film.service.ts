import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, ReplaySubject, tap } from "rxjs";
import { Film } from "./film.model";

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
    private _image$ = new ReplaySubject<string>();
    get image$(): Observable<string> {
        return this._image$;
    }
    private _genres$ = new BehaviorSubject<string[]>([]);
    get genres$(): Observable<string[]> {
        return this._genres$;
    }

    private _loadingFilms$ = new BehaviorSubject<boolean>(false);
    get loadingFilms$(): Observable<boolean> {
        return this._loadingFilms$;
    }
    private _loadingOneFilm$ = new BehaviorSubject<boolean>(false);
    get loadingOneFilm$(): Observable<boolean> {
        return this._loadingOneFilm$;
    }
    private _loadingGenres$ = new BehaviorSubject<boolean>(false);
    get loadingGenres$(): Observable<boolean> {
        return this._loadingGenres$;
    }

    getFilms(getOneRandom: boolean, urlP?: string) {
        this._loadingFilms$.next(true);
        let url = `${environment.apiUrl}/film/`;
        if (urlP) {
            url += urlP;
        }
        else {
            url += 'getRandomFilms'
        }
        this.http.get<Film[]>(url).pipe(
            tap(films => {
                this._films$.next(films);
                if (getOneRandom) {
                    const rand = Math.round(Math.random() * (films.length - 1));
                    const film = films[rand];
                    this._image$.next(environment.imageStorageUrl+"/"+film.imageUrl);
                    this._selectedFilm$.next(film);
                }
            }),
            tap(() => this._loadingFilms$.next(false))
        ).subscribe();
    }

    getFilmsFromOneAuthor(author: string) {
        this.getFilms(true, `getRandomInOneAuthor/${author}`);
    }

    getFilmsFromOneGenre(genre: string) {
        this.getFilms(true, `getRandomInOneGenre/${genre}`);
    }

    getOneFilm(id: string) {
        this._loadingOneFilm$.next(true);
        this.http.get<Film>(`${environment.apiUrl}/film/getOneFilm/${id}`).pipe(
            tap(film => {
                this._image$.next(environment.imageStorageUrl+"/"+film.imageUrl);
                this._selectedFilm$.next(film);
                this._loadingOneFilm$.next(false)
            })
        ).subscribe();

    }

    private getImage(url: string) {
        return this.http.get<HTMLImageElement>(`${environment.imageStorageUrl}/${url}`);
    }

    setFilm(film: Film) {
        this._selectedFilm$.next(film);
    }

    getGenres() {
        this._loadingGenres$.next(true);
        this.http.get<string[]>(`${environment.apiUrl}/film/getGenres`).pipe(
            tap(genres => this._genres$.next(genres)),
            tap(() => this._loadingGenres$.next(false))
        ).subscribe();
    }
}
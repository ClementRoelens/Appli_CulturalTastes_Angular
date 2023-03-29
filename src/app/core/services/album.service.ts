import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, ReplaySubject, tap, throwError } from 'rxjs';
import { Album } from 'src/app/feature/album/album.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class AlbumService{
    constructor(
        private http:HttpClient
    ){}

    private _albums$ = new ReplaySubject<Album[]>();
    get albums$(): Observable<Album[]> {
        return this._albums$;
    }
    private _selectedAlbum$ = new ReplaySubject<Album>()
    get selectedAlbum$(): Observable<Album> {
        return this._selectedAlbum$;
    }

    private _genres$ = new BehaviorSubject<string[]>([]);
    get genres$(): Observable<string[]> {
        return this._genres$;
    }

    private _loadingAlbums$ = new BehaviorSubject<boolean>(false);
    get loadingAlbums$(): Observable<boolean> {
        return this._loadingAlbums$;
    }
    private _loadingOneAlbum$ = new BehaviorSubject<boolean>(false);
    get loadingOneAlbum$() : Observable<boolean>{
        return this._loadingOneAlbum$;
    }
    private _loadingGenres$ = new BehaviorSubject<boolean>(false);
    get loadingGenres$(): Observable<boolean> {
        return this._loadingGenres$;
    }

    private _failSearch$ = new BehaviorSubject<boolean>(false);
    get failSearch$():Observable<boolean>{
        return this._failSearch$;
    }

    getAlbums(getOneRandom: boolean, urlP?: string) {
        this._loadingAlbums$.next(true);
        let url = `${environment.apiUrl}/album/`;
        if (urlP) {
            url += urlP;
        }
        else {
            url += 'getRandomAlbums'
        }
        this.http.get<Album[]>(url).pipe(
            tap(albums => {
                this._albums$.next(albums);
                if (getOneRandom) {
                    const rand = Math.round(Math.random() * (albums.length - 1));
                    this._selectedAlbum$.next(albums[rand]);
                }
            }),
            tap(() => this._loadingAlbums$.next(false))
        ).subscribe();
    }

    getAllAlbums(){
        return this.http.get<Album[]>(`${environment.apiUrl}/album`);
    }

    getAlbumsFromOneAuthor(author: string) {
        this.getAlbums(true, `getRandomInOneAuthor/${author}`);
    }

    getAllAlbumsInOneAuthor(author:string){
        return this.http.get<Album[]>(`${environment.apiUrl}/album/getAllInOneAuthor/${author}`);
    }

    getAlbumsFromOneGenre(genre: string) {
        this.getAlbums(true, `getRandomInOneGenre/${genre}`);
    }

    getAllAlbumsFromOneGenre(genre: string) {
        return this.http.get<Album[]>(`${environment.apiUrl}/album/getAllInOneGenre/${genre}`);
    }

    getOneAlbum(id: string) {
            this._loadingOneAlbum$.next(true);
            this.http.get<Album>(`${environment.apiUrl}/album/getOneAlbum/${id}`).pipe(
                tap(album => this._selectedAlbum$.next(album)),
                tap(()=> this._loadingOneAlbum$.next(false))
            ).subscribe();
        
    }

    setAlbum(album:Album){
        this._selectedAlbum$.next(album);
    }

    getGenres() {
        this._loadingGenres$.next(true);
        this.http.get<string[]>(`${environment.apiUrl}/album/getGenres`).pipe(
            tap(genres => this._genres$.next(genres)),
            tap(() => this._loadingGenres$.next(false))
        ).subscribe();
    }

    search(searchedValue:string) {
        this.http.get<Album[]>(`${environment.apiUrl}/album/search/${searchedValue}`).pipe(
            tap(albums => {
                this._failSearch$.next(false);
                this._albums$.next(albums);
                const rand = Math.round(Math.random() * (albums.length - 1));
                this._selectedAlbum$.next(albums[rand]);
            }),
            catchError(error => {
                console.log("AlbumService : erreur");
                if (error.status === 404) {
                  this._failSearch$.next(true);
                  return throwError(() => new Error('No albums found'));
                }
                return throwError(() => new Error(error));
              })
        ).subscribe();
    }
}
import { tap, ReplaySubject, Observable, BehaviorSubject, switchMap, map } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Opinion } from './models/opinion.model';

const anonymousOpinion: Opinion = new Opinion;

@Injectable()
export class OpinionService {

    // private _opinions:Opinion[] = [];
    private _opinions$ = new BehaviorSubject<Opinion[]>([]);
    get opinions$(): Observable<Opinion[]> {
        return this._opinions$;
    }
    private _selectedOpinion$ = new ReplaySubject<Opinion>();
    get selectedOpinion$(): Observable<Opinion> {
        return this._selectedOpinion$;
    }

    private _index: number = 0;

    constructor(private http: HttpClient) { }

    getOpinions(opinionsId: string[]) {
        console.log("OpinionService.getOpinions()")
        if (opinionsId.length !== 0){
            let opinions: Opinion[] = [];
            if (opinionsId.length > 0) {
                opinionsId.forEach(opinionId => {
                    this.getOneOpinion(opinionId).pipe(
                        tap(opinion => opinions.push(opinion)),
                        tap(() => {
                            if (opinions.length === opinionsId.length) {
                                if (opinionsId.length === 1) {
                                    this._opinions$.next(opinions);
                                    this._selectedOpinion$.next(opinions[0]);
                                } else {
                                    this.sortOpinions(opinions);
                                }
                            }
                        })
                    ).subscribe();
                });
            } else {
                this._opinions$.next(opinions);
            }
        } else {
            this._selectedOpinion$.next(anonymousOpinion);
        }
        
    }

    sortOpinions(opinions:Opinion[]) {
        opinions.sort((a, b) => b.likes - a.likes);
        this._opinions$.next(opinions);
        this._selectedOpinion$.next(opinions[0]);
        this._index = 0;
    }

    opinionUpdated(opinion: Opinion) {
        let opinions = this._opinions$.getValue();
        let opinionsId = opinions.map(opinion => opinion._id);
        const i = opinionsId.indexOf(opinion._id);
        if (i !== -1){
            opinions[i] = opinion;
            this._index = i;
        } else{
            opinions.push(opinion);
            this._index = opinions.length-1;
        }
        this._opinions$.next(opinions);
        this._selectedOpinion$.next(opinion);
    }

    opinionRemoved(id:string){
        let opinions = this._opinions$.getValue();
        let opinionsId = opinions.map(opinion => opinion._id);
        const i = opinionsId.indexOf(id);
        opinions.splice(i, 1);
        this._opinions$.next(opinions);
    }

    getOneOpinion(opinionId: string): Observable<Opinion> {
        return this.http.get<Opinion>(`${environment.apiUrl}/opinion/getOneOpinion/${opinionId}`);
    }

    indexChange(n: number) {
        const newIndex = this._index + n;
        const opinions = this._opinions$.getValue();
        if (newIndex >= 0 && newIndex < opinions.length) {
            this._index = newIndex;
            this._selectedOpinion$.next(opinions[this._index]);
        }
    }

    modifyOpinion(opinionId:string,opinionContent:string) {
        const body = {
            id : opinionId,
            content : opinionContent
        };
        this.http.put<Opinion>(`${environment.apiUrl}/opinion/modifyOpinion`,body).pipe(
            tap(opinion => this._selectedOpinion$.next(opinion))
        ).subscribe();
    }
}
import { tap, ReplaySubject, Observable, BehaviorSubject, switchMap, map } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Opinion } from './models/opinion.model';

@Injectable()
export class OpinionService {

    private _opinions$ = new BehaviorSubject<Opinion[]>([]);
    get opinions$(): Observable<Opinion[]> {
        return this._opinions$;
    }
    private _selectedOpinion$ = new ReplaySubject<Opinion>();
    get selectedOpinion$(): Observable<Opinion> {
        return this._selectedOpinion$;
    }
    private _loading$ = new BehaviorSubject<boolean>(false);
    get loading$(): Observable<boolean> {
        return this._loading$;
    }

    private index:number = 0; 

    constructor(private http: HttpClient) { }

    getOpinions(opinionsId: string[]) {
        let opinions: Opinion[] = [];
        let opinionCount = 0;
        opinionsId.forEach(opinionId => {
            this.getOneOpinion(opinionId).pipe(
                tap(opinion => opinions.push(opinion)),
                tap(() => {
                    opinionCount++;
                    if (opinionCount === opinionsId.length) {
                        opinions.sort((a, b) => b.likes - a.likes);
                        this._opinions$.next(opinions);
                        this._selectedOpinion$.next(opinions[0]);
                        this.index = 0;
                    }
                })
            ).subscribe();
        });

    }

    getOneOpinion(opinionId:string) : Observable<Opinion>{
        return this.http.get<Opinion>(`${environment.apiUrl}/opinion/getOneOpinion/${opinionId}`);
    }

    selectOpinion(id:string){
        this.getOneOpinion(id).pipe(
            tap(opinion=>{
                const opinions = this._opinions$.getValue();
                let flag = false;
                let i = 0;
                while (!flag && i<opinions.length){
                    if (opinions[i]._id === opinion._id){
                        flag = true;
                        this.index = i;
                        this._selectedOpinion$.next(opinions[this.index]);
                    }
                    i++;
                }
            })
        ).subscribe();
    }

    indexChange(n: number) {
        const newIndex = this.index + n;
        const opinions = this._opinions$.getValue();
        if (newIndex >= 0 && newIndex < opinions.length){
            this.index = newIndex;
            this._selectedOpinion$.next(opinions[this.index]);
        }
    }
}
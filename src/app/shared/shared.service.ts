import { OpinionService } from './opinion.service';
import { FilmService } from './../feature/film/film.service';
import { AuthService } from './../core/auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Film } from "../feature/film/film.model";
import { User } from "./models/user.model";
import { tap, Observable } from 'rxjs';
import { Opinion } from './models/opinion.model';

@Injectable()
export class SharedService {
    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private filmService: FilmService,
        private opinionService: OpinionService
    ) { }

    likeOrDislikeItem(itemIdP: string, itemTypeP: string, userIdP: string, actionP: string) {
        const body = {
            itemId: itemIdP,
            itemType: itemTypeP,
            userId: userIdP,
            action: actionP
        };
        this.http.put(`${environment.apiUrl}/shared/likeOrDislikeItem`, body).pipe(
            tap(() => this.authService.getUser(userIdP)),
            tap(() => this.filmService.getOneFilm(itemIdP))
        ).subscribe();
    }

    likeOpinion(opinionIdP: string, userIdP: string) {
        const body = {
            userId: userIdP,
            opinionId: opinionIdP
        };
        this.http.put<Opinion>(`${environment.apiUrl}/shared/likeOpinion`, body).pipe(
            tap(() => this.authService.getUser(userIdP)),
            tap(opinion => {
                this.opinionService.opinionUpdated(opinion)})
        ).subscribe();
    }

    addOpinion(itemIdP: string, userIdP: string, usernameP: string, contentP: string, itemTypeP: string) {
        const body = {
            itemId: itemIdP,
            userId: userIdP,
            username: usernameP,
            content: contentP,
            itemType: itemTypeP
        };
        this.http.post<Opinion>(`${environment.apiUrl}/shared/addOneOpinion`, body).pipe(
            tap(() => this.authService.getUser(userIdP)),
            tap(() => this.filmService.getOneFilm(itemIdP)),
            tap((opinion: Opinion) => {
                if (opinion._id) {
                    this.opinionService.opinionUpdated(opinion)
                }
            })
        ).subscribe();
    }

    eraseOpinion(opinionId: string, userId: string, itemId: string) {
        console.log("SharedService.eraseOpinion() lancé");
        this.http.delete(`${environment.apiUrl}/shared/removeOpinion/${opinionId}/${userId}/${itemId}`)
            .pipe(
                tap(() => this.authService.getUser(userId)),
                tap(() => this.filmService.getOneFilm(itemId)),
                tap(() => this.opinionService.opinionRemoved(opinionId))
            )
            .subscribe(() => {
                this.authService.getUser(userId);
                this.filmService.getOneFilm(itemId);
            });
    }
}
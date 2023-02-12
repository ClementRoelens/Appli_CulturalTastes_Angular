import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FilmService } from './film.service';
import { Injectable } from "@angular/core";
import { Film } from './film.model';

@Injectable()
export class FilmResolver implements Resolve<Film[]>{
    constructor(private filmService: FilmService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Film[]> {

        const method = route.paramMap.get("method");
        if (method === "genre") {
            const param = route.paramMap.get("param");
            if (param !== null) {
                return this.filmService.getAllFilmsFromOneGenre(param);
            }
        } else if (method === "author") {
            const param = route.paramMap.get("param");
            if (param !== null) {
                return this.filmService.getAllFilmsInOneAuthor(param);
            }
        }
        return this.filmService.getAllFilms();

    }
}
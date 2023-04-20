import { Game } from './../../../feature/game/game.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/feature/film/film.model';
import { Observable, map } from 'rxjs';
import { Album } from 'src/app/feature/album/album.model';

@Component({
  selector: 'app-full-list',
  templateUrl: './full-list.component.html',
  styleUrls: ['./full-list.component.scss']
})
export class FullListComponent implements OnInit {

  items$!:Observable<Film[] | Game[] | Album[]>;
  moduleName!:string;

  constructor(
    private route:ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.items$ = this.route.data.pipe(
      map(data => data['items'])
    );
    this.moduleName = this.getModuleName();
  }

  getEncodedAuthorUrl(author: string) {
    return encodeURI(`/author/${author}`);
  }

  backToHome(){
    this.router.navigate([this.moduleName]);
  }

  private getModuleName() {
    let currentRoute = this.route.snapshot;
    while (currentRoute) {
      if (currentRoute.routeConfig && currentRoute.routeConfig.loadChildren) {
        const modulePath = currentRoute.routeConfig.loadChildren.toString();
        const pathStart = modulePath.substring(modulePath.indexOf("feature/")+8);
        const pathEnd = pathStart.indexOf("/");
        const path = pathStart.substring(0,pathEnd);
        return path;
      }
      if (currentRoute.parent){
        currentRoute = currentRoute.parent;
      } else {
        return "";
      }
    }
    return "";
  }
}

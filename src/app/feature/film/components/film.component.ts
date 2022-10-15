import { JwtHelperService } from '@auth0/angular-jwt';
import { SharedService } from './../../../shared/shared.service';
import { AuthService } from './../../../core/auth.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, switchMap, tap } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { Film } from '../film.model';
import { FilmService } from '../film.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SigninComponent } from 'src/app/core/components/signin/signin.component';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FilmComponent implements OnInit {

  user$!:Observable<User | null>;
  films$!:Observable<Film[]>;
  loading$!:Observable<boolean>;
  genres$!:Observable<string[]>;

  selectedFilm!:Film;
  userId!:string;
  isLogged!:boolean;
  
  helper:JwtHelperService = new JwtHelperService;

  constructor(
    private filmService:FilmService,
    private authService:AuthService,
    private sharedService : SharedService,
    private snackBar : MatSnackBar,
    private dialog:MatDialog
    ) { }

  ngOnInit(): void {
    console.log('Film Init');
    this.initObservables();
    this.filmService.getFilms();
    this.filmService.getGenres();
  }

  

  initObservables(){
    console.log("FIlm init observables");

    this.authService.user$.pipe(
      tap(user=> this.isLogged = user ? true : false),
      tap(()=>{
        const jwt = localStorage.getItem('JWT');
        if (jwt){
          this.userId = this.helper.decodeToken(jwt).userId;
        }
      })
      ).subscribe();
    this.user$ = this.authService.user$;

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

  onLikedOrDisliked(action:string){
    if (!this.isLogged){
      let snackBarRef = this.snackBar.open('Vous devez être connectés pour effectuer cette action','Se connecter',{ duration : 4000});
      snackBarRef.onAction().subscribe(()=>{
        this.dialog.open(SigninComponent)
      });
    }
    else {
      this.sharedService.likeOrDislikeItem(this.selectedFilm._id,'film',this.userId,action);
    }
  }
}

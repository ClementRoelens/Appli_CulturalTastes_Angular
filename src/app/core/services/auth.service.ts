import { tap, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { User } from '../../shared/models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError } from "rxjs/internal/operators/catchError";

const anonymouseUser: User = new User();

@Injectable()
export class AuthService {

    private _logging$ = new BehaviorSubject<boolean>(false);
    get logging$(): Observable<boolean> {
        return this._logging$;
    }

    private _errorMessage$ = new BehaviorSubject<string>("");
    get errorMessage$(): Observable<string> {
        return this._errorMessage$;
    }

    private _user$ = new BehaviorSubject<User>(anonymouseUser);
    get user$(): Observable<User> {
        return this._user$;
    }
    private _isLogged$ = new BehaviorSubject<boolean>(false);
    get isLogged$(): Observable<boolean> {
        return this._isLogged$;
    }
    private _token: string = '';
    get token(): string {
        return this._token;
    }
    helper: JwtHelperService = new JwtHelperService();

    constructor(private http: HttpClient) { }

    signup(usernameP: string, passwordP: string): Observable<any> {
        const body = {
            username: usernameP,
            password: passwordP
        };
        return this.http.post(`${environment.apiUrl}/user/signup`, body, { observe: "response" });
    }

    signin(usernameP: string, passwordP: string) {
        this._logging$.next(true);
        const credentials = {
            username: usernameP,
            password: passwordP
        }
        this.http.post<any>(`${environment.apiUrl}/user/signin`, credentials).pipe(
            tap(user => {
                this._token = user.token;
                this._isLogged$.next(true);
                this.storeJwt(user.token);
            }),
            map(user => {
                delete user.token;
                return user;
            }),
            catchError(error => {
                if (error.status === 401){
                    this._errorMessage$.next("Mot de passe incorrect");
                    this._errorMessage$.next("");
                    return throwError(() => new Error("Mot de passe incorrect"));
                } else if (error.status === 404){
                    this._errorMessage$.next("Utilisateur non-trouvé");
                    this._errorMessage$.next("");
                    return throwError(()=> new Error("Utilisateur non-trouvé"));
                } else {
                    return throwError(()=> new Error(error));
                }
            }),
            tap(user => {
                this._user$.next(user);
                this._logging$.next(false);
            })
        ).subscribe()
    }

    signout() {
        localStorage.removeItem('User');
        this._user$.next(anonymouseUser);
        this._isLogged$.next(false);
        localStorage.removeItem('JWT');
        this._token = '';
    }

    getUser(id: string) {
        this.http.get<User>(`${environment.apiUrl}/user/getOneUser/${id}`).pipe(
            tap(user => this._user$.next(user))
        ).subscribe();
    }

    setUser(user:User){
        this._user$.next(user);
    }

    // getUsername(id: string): Observable<string> {
    //     return this.http.get<User>(`${environment.apiUrl}/user/getOneUser/${id}`).pipe(
    //         map(user => user.username)
    //     );
    // }

    getStoredJwtUser() {
        const jwt = localStorage.getItem('JWT');
        if (jwt) {
            this._token = jwt;
            const decodedToken = this.helper.decodeToken(jwt);
            const expiredDate = decodedToken.exp;
            const now = Date.now()/1000;
            if (now < expiredDate)  {
                const id = decodedToken.userId;
                this.http.get<User>(`${environment.apiUrl}/user/getOneUser/${id}`).pipe(
                    tap(user => this._user$.next(user)),
                    tap(() => this._isLogged$.next(true))
                ).subscribe();
            }

        }
    }

    private storeJwt(jwt: string) {
        localStorage.setItem('JWT', jwt);
    }
}


import { tap, map, ReplaySubject, Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { User } from '../shared/models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

const anonymouseUser:User = new User();

@Injectable()
export class AuthService {

    private _user$ = new BehaviorSubject<User>(anonymouseUser);
    get user$(): Observable<User> {
        return this._user$;
    }
    private _isLogged$ = new BehaviorSubject<boolean>(false);
    get isLogged$():Observable<boolean>{
        return this._isLogged$;
    }
    private _token: string = '';
    get token(): string {
        return this._token;
    }
    helper: JwtHelperService = new JwtHelperService();

    constructor(private http: HttpClient) { }

    signin(nicknameP: string, passwordP: string) {
        const credentials = {
            nickname: nicknameP,
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
            tap(user => this._user$.next(user))
        ).subscribe()
    }

    signout() {
        localStorage.removeItem('User');
        this._user$.next(anonymouseUser);
        this._isLogged$.next(false);
        localStorage.removeItem('jwt');
        this._token = '';
    }

    getUser(id: string) {
        this.http.get<User>(`${environment.apiUrl}/user/getOneUser/${id}`).pipe(
            tap(user => this._user$.next(user))
        ).subscribe();
    }

    getUsername(id:string) : Observable<string> {
        return this.http.get<User>(`${environment.apiUrl}/user/getOneUser/${id}`).pipe(
            map(user=> user.nickname)
        );
    }

    getStoredJwtUser() {
        const jwt = localStorage.getItem('JWT');
        if (jwt) {
            this._token = jwt;
            const id = this.helper.decodeToken(jwt).userId;
            this.http.get<User>(`${environment.apiUrl}/user/getOneUser/${id}`).pipe(
                tap(user=>this._user$.next(user)),
                tap(()=>this._isLogged$.next(true))
            ).subscribe();
        }
    }

    private storeJwt(jwt: string) {
        localStorage.setItem('JWT', jwt);
    }
}


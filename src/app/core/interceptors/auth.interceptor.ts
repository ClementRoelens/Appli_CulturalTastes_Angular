import { AuthService } from '../services/auth.service';
import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs";



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService){}

    intercept(req:HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
        const headers = new HttpHeaders()
        .append('Authorization', `Bearer ${this.authService.token}`);
      const modifiedReq = req.clone({ headers });
      return next.handle(modifiedReq);
    }
}
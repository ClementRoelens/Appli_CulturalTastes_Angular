import { tap } from 'rxjs';
import { Observable } from 'rxjs';
import { SigninComponent } from './../signin/signin.component';
import { AuthService } from './../../auth.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  user$!:Observable<User>;
  isLogged$!:Observable<boolean>;

  constructor(
    private authService:AuthService,
    public dialog:MatDialog,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.authService.getStoredJwtUser();
    this.user$ = this.authService.user$;
    this.isLogged$ = this.authService.isLogged$;
  }

  signup(){
    
  }

  signin(){
    this.dialog.open(SigninComponent);
    this.dialog.afterAllClosed.pipe(
      tap(()=>window.location.reload())
    ).subscribe()
  }

  signout(){
    this.authService.signout();
  }
}

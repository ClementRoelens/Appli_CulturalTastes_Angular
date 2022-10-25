import { SignupComponent } from './../signup/signup.component';
import { Observable, tap } from 'rxjs';
import { SigninComponent } from './../signin/signin.component';
import { AuthService } from './../../auth.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { MatDialog } from '@angular/material/dialog';

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
    public dialog:MatDialog
    ) { }

  ngOnInit(): void {
    this.authService.getStoredJwtUser();
    this.user$ = this.authService.user$;
    this.isLogged$ = this.authService.isLogged$;
  }

  signup(){
    let signupRef = this.dialog.open(SignupComponent);
    signupRef.afterClosed().pipe(
      tap(()=>window.location.reload())
    ).subscribe();
  }

  signin(){
    let signinRef = this.dialog.open(SigninComponent);
    signinRef.afterClosed().pipe(
      tap(()=>window.location.reload())
    ).subscribe()
  }

  signout(){
    this.authService.signout();
  }
}

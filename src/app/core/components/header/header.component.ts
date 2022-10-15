import { tap } from 'rxjs';
import { Observable } from 'rxjs';
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

  user$!:Observable<User | null>;

  constructor(
    private authService:AuthService,
    public dialog:MatDialog
    ) { }

  ngOnInit(): void {
    this.authService.getStoredJwtUser();
    this.user$ = this.authService.user$;
  }

  signup(){
    
  }

  signin(){
    this.dialog.open(SigninComponent);
  }

  signout(){
    this.authService.signout();
  }
}

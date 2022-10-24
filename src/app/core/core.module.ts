import { httpInterceptorProviders } from './interceptors/index';
import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
// import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SigninComponent } from './components/signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    // RouterModule,
    HttpClientModule
  ],
  exports:[
    HeaderComponent
  ],
  providers:[
    AuthService,
    httpInterceptorProviders
  ]
})
export class CoreModule { }

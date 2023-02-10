import { httpInterceptorProviders } from './interceptors/index';
import { AuthService } from './auth.service';
import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
// import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SigninComponent } from './components/signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import * as Hammer from 'hammerjs';
import {
HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG} 
from '@angular/platform-browser';
import { SwipeToolTipComponentComponent } from './components/swipe-tool-tip-component/swipe-tool-tip-component.component';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  override = <any> {
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}

@NgModule({
  declarations: [
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    SwipeToolTipComponentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    // RouterModule,
    HttpClientModule,
    HammerModule
  ],
  exports:[
    HeaderComponent
  ],
  providers:[
    AuthService,
    httpInterceptorProviders,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    }
  ]
})
export class CoreModule { }

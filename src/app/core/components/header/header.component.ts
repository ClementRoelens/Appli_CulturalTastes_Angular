import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged!:boolean;
  user!:User;
  constructor() { }

  ngOnInit(): void {
  }

  signup(){
    
  }

  signin(){

  }

  signout(){

  }
}

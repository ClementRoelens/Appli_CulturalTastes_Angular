import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin-or-signup',
  templateUrl: './signin-or-signup.component.html',
  styleUrls: ['./signin-or-signup.component.scss']
})
export class SigninOrSignupComponent implements OnInit {

  constructor(public dialogRef : MatDialogRef<SigninOrSignupComponent>) { }

  ngOnInit(): void {
  }

  close(choice:string){
    this.dialogRef.close(choice);
  }
}

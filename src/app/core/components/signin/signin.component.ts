import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  userForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dialogRef:MatDialogRef<SigninComponent>
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      nickname: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signin() {
    this.authService.signin(this.userForm.value['nickname'], this.userForm.value['password']);
    this.dialogRef.close();
  }
}

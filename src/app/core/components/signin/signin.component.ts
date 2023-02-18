import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';

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
    private dialogRef:MatDialogRef<SigninComponent>,
    private snackbar:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signin() {
    if (this.userForm.valid){
      this.authService.signin(this.userForm.value['username'], this.userForm.value['password']);
      this.authService.logging$.pipe(
        tap( logging => {
          if (!logging){
            this.dialogRef.close();
          }
        })
      ).subscribe();
    } else {
      this.snackbar.open("Remplissez les champs pour vous connecter",undefined,{duration:1500,verticalPosition:"top"});
    }
    
    
  }
}

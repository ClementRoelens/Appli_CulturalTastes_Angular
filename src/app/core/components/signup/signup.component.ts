import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userForm!:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private dialogRef:MatDialogRef<SignupComponent>,
    private snackbar:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  signup(){
    if (this.userForm.valid){
      this.authService.signup(this.userForm.value.username,this.userForm.value.password).pipe(
        tap(res=>{
          if (res.status !== 201){
            console.log('Erreur '+res.error);
          }
          else {
            this.authService.signup(this.userForm.value.username,this.userForm.value.password);
            let snackbarRef = this.snackbar.open('Votre compte a bien été créée', 'Fermer', {duration:2000})
            snackbarRef.afterDismissed().pipe(
              tap(()=>this.dialogRef.close())
            ).subscribe();
          }
        })
      ).subscribe();
    } else {
      this.snackbar.open("Remplissez les champs pour vous connecter");
    }
  
  }

}

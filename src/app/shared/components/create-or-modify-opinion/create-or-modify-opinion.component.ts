import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-or-modify-opinion',
  templateUrl: './create-or-modify-opinion.component.html',
  styleUrls: ['./create-or-modify-opinion.component.scss']
})
export class CreateOrModifyOpinionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateOrModifyOpinionComponent>) { }

  ngOnInit(): void {
  }

  close(choice:string){
    console.log("CreateOrModifyOpinion.Close sur "+choice);
    this.dialogRef.close(choice);
  }
}

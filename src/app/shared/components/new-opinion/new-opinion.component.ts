import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from './../../shared.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-opinion',
  templateUrl: './new-opinion.component.html',
  styleUrls: ['./new-opinion.component.scss']
})
export class NewOpinionComponent implements OnInit {

  opinionForm!: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private dialogRef:MatDialogRef<NewOpinionComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.opinionForm = this.formBuilder.control("");
  }

  sendOpinion() {
    this.sharedService.addOpinion(this.data.itemId, this.data.userId, this.opinionForm.value,this.data.itemType);
    this.dialogRef.close();
  }
}

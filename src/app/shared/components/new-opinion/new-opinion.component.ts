import { OpinionService } from '../../../core/services/opinion.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '../../../core/services/shared.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-opinion',
  templateUrl: './new-opinion.component.html',
  styleUrls: ['./new-opinion.component.scss']
})
export class NewOpinionComponent implements OnInit {

  opinionForm!: FormControl;
  opinionContent!: string;
  newOne!:boolean;

  constructor(
    private sharedService: SharedService,
    private opinionService:OpinionService,
    private dialogRef: MatDialogRef<NewOpinionComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    if (this.data.existingOpinionContent){
      this.opinionContent = this.data.existingOpinionContent;
      this.newOne = false;
    } else {
      this.opinionContent = "";
      this.newOne = true;
    }
  }

  sendOpinion() {
    if (this.newOne){
      // console.log(`Les données à envoyer sont :\n-itemId : ${this.data.itemId}\n-userId:${this.data.userId}\n-username:${this.data.username}\n-contenu:${this.opinionContent}\n-itemType:${this.data.itemType}`);
      this.sharedService.addOpinion(this.data.itemId, this.data.userId, this.data.username, this.opinionContent, this.data.itemType);
    } else {
      this.opinionService.modifyOpinion(this.data.opinionId,this.opinionContent);
    }
    this.dialogRef.close();
  }
}

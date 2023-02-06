import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-or-modify-opinion',
  templateUrl: './create-or-modify-opinion.component.html',
  styleUrls: ['./create-or-modify-opinion.component.scss']
})
export class CreateOrModifyOpinionComponent implements OnInit {

  @HostBinding('device') device!: string;

  constructor(public dialogRef: MatDialogRef<CreateOrModifyOpinionComponent>) { }

  ngOnInit(): void {
    this.checkWidth(window.innerWidth);
  }

  checkWidth(width: number) {
    if (width <= 900) {
      this.device = 'mobile-only';
    } else {
      this.device = 'desktop-only';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWidth(event.target.innerWidth);
  }

  close(choice:string){
    this.dialogRef.close(choice);
  }
}

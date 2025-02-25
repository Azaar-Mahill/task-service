import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-global-popup',
  standalone: false,
  templateUrl: './global-popup.component.html',
  styleUrl: './global-popup.component.css'
})
export class GlobalPopupComponent {

  title ="";
  description ="";
  needUpdate = false;

  constructor(public dialogRef: MatDialogRef<GlobalPopupComponent>) {}

  updateTask() {
    this.needUpdate = true;
    this.dialogRef.close(); 
  }

  closeDialog() {
    this.needUpdate = false;
    this.dialogRef.close(); 
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: [
  ]
})
export class ConfirmDialogComponent implements OnInit {

  // constructor() { }
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hero,  /** <-- Servicio intectado manualmente */
  ) {
    // console.log({ data });
    
  }

  ngOnInit(): void {
  }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void{
    this.dialogRef.close(true);
  }
}

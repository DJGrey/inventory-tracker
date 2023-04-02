import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  defaultValue: number;
}

@Component({
  selector: 'app-number-dialog',
  templateUrl: './number-dialog.component.html',
  styleUrls: ['./number-dialog.component.scss'],
})
export class NumberDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NumberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  value!: number;

  ngOnInit(): void {
    this.value = this.data.defaultValue;
  }

  onNoClick(): void {
    this.dialogRef.close({ data: null });
  }

  onSubmit(): void {
    this.dialogRef.close({ data: this.value });
  }
}

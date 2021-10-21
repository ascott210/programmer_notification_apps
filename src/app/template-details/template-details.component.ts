import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailTemplate } from '../shared/interfaces';

export interface DialogData {
  template: EmailTemplate;
}

@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.scss'],
})
export class TemplateDetailsComponent implements OnInit {
  template!: EmailTemplate;

  templateForm = new FormGroup({
    id: new FormControl(this.data?.template?.id || ''),
    name: new FormControl(this.data?.template?.name || '', Validators.required),
    subject: new FormControl(
      this.data?.template?.subject || '',
      Validators.required
    ),
    body: new FormControl(this.data?.template?.body || '', Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<TemplateDetailsComponent>
  ) {}

  ngOnInit(): void {}

  onSave(formValue: EmailTemplate) {
    this.dialogRef.close(formValue);
  }

  onCancel() {
    this.dialogRef.close();
  }
}

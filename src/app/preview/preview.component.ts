import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { PreviewService } from '../core/preview.service';
import { RecipientsComponent } from '../recipients/recipients.component';
import { PreviewData } from '../shared/interfaces';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnDestroy {
  previewForm = new FormGroup({
    recipients: new FormControl([]),
    subject: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
  });

  previewDataSub = this.previewService.previewData$
    .pipe(
      tap((data: PreviewData | null) => {
        console.log(data);
        if (data) {
          this.previewForm.setValue({
            recipients: data.recipients,
            subject: data.subject,
            body: data.body,
          });
        } else {
          this.previewForm.reset();
        }
      })
    )
    .subscribe();

  constructor(
    private previewService: PreviewService,
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.previewDataSub.unsubscribe();
  }

  async openRecipients() {
    this.dialog.open(RecipientsComponent, {
      width: '60%',
      data: { recipients: this.previewForm.controls.recipients.value },
    });
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { ErrorHandlerService } from '../core/error-handler.service';
import { PreviewService } from '../core/preview.service';
import { RecipientsComponent } from '../recipients/recipients.component';
import { Contact, Email, PreviewData } from '../shared/interfaces';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnDestroy {
  test = 'test';
  sending = false;

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
    private dialog: MatDialog,
    private errorHandler: ErrorHandlerService
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

  async onSubmit(test: boolean) {
    this.sending = true;
    let recipients: Contact[];
    let emails: Email[];

    let email$;

    if (test === true) {
      emails = [
        {
          subject: this.previewForm.controls.subject.value,
          body: this.previewForm.controls.body.value,
        },
      ];
      email$ = this.previewService.sendTestEmail(emails);
    } else if (test === false) {
      recipients = this.previewForm.controls.recipients.value;
      emails = recipients.map((recipient) => ({
        subject: this.previewForm.controls.subject.value,
        body: this.previewForm.controls.body.value,
        emailTo: recipient.email,
        nameTo: recipient.name,
      }));
      email$ = this.previewService.sendEmail(emails);
    }

    try {
      if (!email$) throw '';
      await email$.toPromise();
      this.errorHandler.openSnackBar('Mail successfully sent!');
      this.sending = false;
    } catch (error) {
      this.errorHandler.openSnackBar('Error sending mail.');
      this.sending = false;
    }
  }
}

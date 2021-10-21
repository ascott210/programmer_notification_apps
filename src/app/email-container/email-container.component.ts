import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PreviewService } from '../core/preview.service';
import { SelectionService } from '../core/selection.service';
import {
  EmailTemplate,
  Member,
  PreviewData,
  Programmer,
  SelectionFormValue,
} from '../shared/interfaces';
import { TemplateManagerComponent } from '../template-manager/template-manager.component';

@Component({
  selector: 'app-email-container',
  templateUrl: './email-container.component.html',
  styleUrls: ['./email-container.component.scss'],
})
export class EmailContainerComponent implements OnInit {
  constructor(
    private selectionService: SelectionService,
    private dialog: MatDialog,
    private previewService: PreviewService
  ) {}

  members$ = this.selectionService.getMemberList();
  programmers$!: Observable<any>;
  selectedTemplate$!: Observable<EmailTemplate>;

  ngOnInit(): void {}

  getProgrammerList(accountId: string) {
    this.programmers$ = this.selectionService.getProgrammerList(accountId).pipe(
      map((programmers) => {
        return programmers.map((programmer) => ({
          id: programmer.id,
          itemName: programmer.programmerName,
        }));
      }),
      take(1)
    );
  }

  async openTemplateManager() {
    const dialogRef = this.dialog.open(TemplateManagerComponent, {
      width: '60%',
      data: {},
    });

    const selectedTemplate = await dialogRef.afterClosed().toPromise();
    this.selectedTemplate$ = of(selectedTemplate);
  }

  async submit(selectionFormValue: SelectionFormValue) {
    const recipients = await this.previewService
      .getContactList(
        selectionFormValue.member,
        selectionFormValue.programmers.map((programmer) => programmer.id)
      )
      .toPromise();

    const previewData: PreviewData = {
      recipients: recipients,
      subject: selectionFormValue.template.subject,
      body: selectionFormValue.template.body,
    };
    this.previewService.updatePreviewData(previewData);
  }
}

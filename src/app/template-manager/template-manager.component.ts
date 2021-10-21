import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { TemplateService } from '../core/template.service';
import { EmailTemplate } from '../shared/interfaces';
import { TemplateDetailsComponent } from '../template-details/template-details.component';

@Component({
  selector: 'app-template-manager',
  templateUrl: './template-manager.component.html',
  styleUrls: ['./template-manager.component.scss'],
})
export class TemplateManagerComponent implements OnInit {
  templates$ = this.templateService.getAllTemplates();

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<TemplateManagerComponent>,
    private templateService: TemplateService
  ) {}

  ngOnInit(): void {}

  async openDialog(template: EmailTemplate | null) {
    const dialogRef = this.dialog.open(TemplateDetailsComponent, {
      width: '60%',
      data: { template },
    });

    const result = await dialogRef.afterClosed().toPromise();

    if (result) {
      await this.templateService.saveTemplate(result).pipe(take(1)).toPromise();
    }

    const templates = await this.templateService
      .getAllTemplates()
      .pipe(take(1))
      .toPromise();
    this.templates$ = of(templates);
  }

  deleteTemplate(templateId: string) {
    this.templateService.deleteTemplate(templateId).pipe(take(1)).subscribe();
  }

  selectTemplate(template: EmailTemplate) {
    this.dialogRef.close(template);
  }
}

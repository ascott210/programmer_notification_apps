import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmailTemplate } from '../shared/interfaces';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss'],
})
export class TemplateListComponent implements OnInit {
  dataSource!: MatTableDataSource<EmailTemplate>;
  private _templates!: EmailTemplate[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input()
  set templates(val: EmailTemplate[]) {
    this._templates = val;
    this.dataSource = new MatTableDataSource(val);
    this.dataSource.paginator = this.paginator;
  }

  @Output() onEditTemplate: EventEmitter<EmailTemplate> = new EventEmitter();
  @Output() onDeleteTemplate: EventEmitter<string> = new EventEmitter();
  @Output() onSelectTemplate: EventEmitter<EmailTemplate> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  displayedColumns: string[] = ['name', 'buttons'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editTemplate(template: EmailTemplate) {
    this.onEditTemplate.emit(template);
  }

  async delete(template: EmailTemplate) {
    const deleteTemplate = await new Promise(function (resolve, reject) {
      let confirmed = window.confirm(
        'Are you sure you want to delete this template?'
      );

      return confirmed ? resolve(true) : reject(false);
    }).catch(() => null);

    this._templates = this._templates.filter(
      (displayedTemplate) => displayedTemplate.id !== template.id
    );
    this.dataSource = new MatTableDataSource(this._templates);
    this.dataSource.paginator = this.paginator;

    if (deleteTemplate) this.onDeleteTemplate.emit(template.id);
  }

  select(template: EmailTemplate) {
    this.onSelectTemplate.emit(template);
  }
}

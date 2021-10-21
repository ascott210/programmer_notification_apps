import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Contact } from '../shared/interfaces';

export interface DialogDataRecipients {
  recipients: Contact[];
}

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.scss'],
})
export class RecipientsComponent implements AfterViewInit {
  dataSource!: MatTableDataSource<Contact>;

  displayedColumns: string[] = ['name', 'email', 'programmerName'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<RecipientsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataRecipients
  ) {}

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.data.recipients);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EmailTemplate, Member, Programmer } from '../shared/interfaces';
import { multiSelectSettings } from '../shared/multi-select-settings';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss'],
})
export class SelectionComponent implements OnInit {
  @Input() members: Member[] = [];
  @Input() programmers: any[] = [];
  @Input() set selectedTemplate(val: EmailTemplate | null) {
    if (val) {
      this.selectionForm.controls.template.setValue(val);
    } else {
      this.selectionForm.controls.template.setValue(null);
    }
  }

  @Output() onGetProgrammers: EventEmitter<string> = new EventEmitter();
  @Output() onOpenTemplateManager: EventEmitter<null> = new EventEmitter();
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  selectionForm = new FormGroup({
    member: new FormControl('', Validators.required),
    programmers: new FormControl([], Validators.required),
    template: new FormControl(null, Validators.required),
  });

  filteredMembers!: Observable<Member[]>;
  multiSelectSettings = multiSelectSettings;

  ngOnInit() {
    this.filteredMembers = this.selectionForm.controls.member.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): Member[] {
    const filterValue = value.toLowerCase();
    return this.members.filter(
      (member) =>
        member.name.toLowerCase().includes(filterValue) ||
        member.memberCode.toLowerCase().includes(filterValue)
    );
  }

  displayFn(memberId: string) {
    if (!memberId) return '';
    let member;
    if (this.members) {
      member = this.members.find((member) => member.id === memberId);
    }
    if (!member) return '';
    return `${member.memberCode} - ${member.name}`;
  }

  onMemberSelected(memberId: string) {
    this.onGetProgrammers.emit(memberId);
  }

  openTemplateManager() {
    this.onOpenTemplateManager.emit();
  }

  submit(selectionFormValue: any) {
    this.onSubmit.emit(selectionFormValue);
  }
}

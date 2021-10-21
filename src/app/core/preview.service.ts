import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact, PreviewData } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PreviewService {
  private previewData = new BehaviorSubject<PreviewData | null>(null);
  previewData$ = this.previewData.asObservable();

  constructor(private http: HttpClient) {}

  updatePreviewData(data: PreviewData) {
    this.previewData.next(data);
  }

  getContactList(programmerIds: string[]) {
    const endpoint = environment.apiEndpoint + 'programmers/contacts';
    return this.http.post<Contact[]>(endpoint, programmerIds);
  }
}

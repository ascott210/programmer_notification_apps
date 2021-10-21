import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact, Email, PreviewData } from '../shared/interfaces';

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

  getContactList(accountId: string, programmerIds: string[]) {
    const endpoint = environment.apiEndpoint + 'programmers/contacts';
    return this.http.post<Contact[]>(endpoint, { accountId, programmerIds });
  }

  sendEmail(emails: Email[]) {
    const endpoint = environment.apiEndpoint + 'email/sendEmail';
    return this.http.post(endpoint, emails);
  }

  sendTestEmail(emails: Email[]) {
    const endpoint = environment.apiEndpoint + 'email/sendTestEmail';
    return this.http.post(endpoint, emails);
  }
}

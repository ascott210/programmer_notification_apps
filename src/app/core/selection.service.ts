import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact, Member, Programmer } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class SelectionService {
  constructor(private http: HttpClient) {}

  getMemberList(): Observable<Member[]> {
    const endpoint = environment.apiEndpoint + 'members';
    return this.http.get<Member[]>(endpoint);
  }

  getProgrammerList(accountId: string): Observable<Programmer[]> {
    const endpoint = environment.apiEndpoint + 'programmers';
    return this.http.get<Programmer[]>(endpoint, {
      params: { accountId },
    });
  }

  getContactList(programmerIds: string[]): Observable<Contact[]> {
    const endpoint = environment.apiEndpoint + 'programmers/contacts';
    return this.http.get<Contact[]>(endpoint, {
      params: { programmerIds },
    });
  }
}

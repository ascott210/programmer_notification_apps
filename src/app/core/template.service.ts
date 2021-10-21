import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EmailTemplate } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor(private http: HttpClient) {}

  getAllTemplates() {
    const endpoint = environment.apiEndpoint + 'templates';
    return this.http.get<EmailTemplate[]>(endpoint);
  }

  saveTemplate(template: EmailTemplate) {
    const endpoint = environment.apiEndpoint + 'templates';
    return this.http.post(endpoint, template);
  }

  deleteTemplate(templateId: string) {
    const endpoint = environment.apiEndpoint + 'templates';
    return this.http.delete(endpoint, { params: { templateId } });
  }
}

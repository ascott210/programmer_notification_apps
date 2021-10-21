export interface Member {
  id: string;
  name: string;
  memberCode: string;
}

export interface Programmer {
  id: string;
  programmerName: string;
}

export interface Contact {
  id: string;
  email: string;
  name: string;
  programmerName: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

export interface Email {
  id: string;
  emailFrom: string;
  emailTo: string;
  nameFrom: string;
  nameTo: string;
  subject: string;
  body: string;
  date: string;
}

export interface PreviewData {
  recipients: Contact[];
  subject: string;
  body: string;
}

export interface SelectionFormValue {
  member: string;
  programmers: { id: string; itemName: string }[];
  template: EmailTemplate;
}

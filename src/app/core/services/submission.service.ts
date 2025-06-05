import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private key = 'formSubmissions';

  saveSubmission(submission: any) {
    const submissions = JSON.parse(localStorage.getItem(this.key) || '[]');
    submissions.push(submission);
    localStorage.setItem(this.key, JSON.stringify(submissions));
  }

  getAllSubmissions() {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  getSubmissionsByFormId(formId: string) {
    return this.getAllSubmissions().filter((s: any) => s.formId === formId);
  }
}

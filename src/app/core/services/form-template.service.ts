import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class FormTemplateService {
  private storageKey = 'formTemplates';

  getAllForms() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  getFormById(id: string) {
    return this.getAllForms().find((form: any) => form.id === id);
  }

  saveForm(form: any) {
    const forms = this.getAllForms();
    const index = forms.findIndex((f: any) => f.id === form.id);
    if (index >= 0) {
      forms[index] = form;
    } else {
      form.id = uuidv4();
      forms.push(form);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(forms));
  }

  deleteForm(id: string) {
    const forms = this.getAllForms().filter((form: any) => form.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(forms));
  }
}

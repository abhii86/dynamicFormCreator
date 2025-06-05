import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormTemplateService } from '../core/services/form-template.service';
import { NgFor, NgIf } from '@angular/common';

import { MatListModule } from '@angular/material/list';
import { MatButton  } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-form-list',
  standalone: true,
  imports:[NgFor, NgIf, MatFormFieldModule,MatInputModule,MatIconModule,MatDatepickerModule,
           MatListModule, MatButton, MatSelectModule,MatCheckboxModule, MatRadioModule,
           MatNativeDateModule, MatButtonModule,MatCardModule, MatOptionModule],
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {
  formTemplates: any[] = [];

  constructor(private formService: FormTemplateService, private router: Router) {}

  ngOnInit(): void {
    this.loadForms();
  }

  loadForms() {
    this.formTemplates = this.formService.getAllForms();
  }

  editForm(id: string) {
    this.router.navigate(['/builder', id]);
  }

  previewForm(id: string) {
    this.router.navigate(['/preview', id]);
  }

  deleteForm(id: string) {
    if (confirm('Are you sure you want to delete this form?')) {
      this.formService.deleteForm(id);
      this.loadForms();
    }
  }
  navigateToBuilder(){
    this.router.navigate(['/builder']);
  }
}

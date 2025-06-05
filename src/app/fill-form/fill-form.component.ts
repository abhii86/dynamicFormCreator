import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormTemplateService } from '../core/services/form-template.service';
import { SubmissionService } from '../core/services/submission.service';
import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';

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

@Component({
  selector: 'app-fill-form',
  standalone: true,
  imports:[NgFor, NgIf, FormsModule, ReactiveFormsModule, NgSwitch, NgSwitchCase,
           MatFormFieldModule,MatInputModule,MatIconModule,MatDatepickerModule,
           MatListModule, MatButton, MatSelectModule,MatCheckboxModule, MatRadioModule,
           MatNativeDateModule, MatButtonModule,MatCardModule
  ],
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss']
})
export class FillFormComponent implements OnInit {
  formId: string = '';
  formTemplate: any;
  formGroup: FormGroup = new FormGroup({});
  isSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    private formService: FormTemplateService,
    private submissionService: SubmissionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formId = this.route.snapshot.paramMap.get('id') || '';
    this.formTemplate = this.formService.getFormById(this.formId);
    if (this.formTemplate) {
      this.createForm();
    }
  }

  createForm() {
    const group: { [key: string]: FormControl } = {};

    this.formTemplate.fields.forEach((field: any, index: number) => {
      const validators = [];

      if (field.required) validators.push(Validators.required);
      if (field.validations?.minLength) validators.push(Validators.minLength(field.validations.minLength));
      if (field.validations?.maxLength) validators.push(Validators.maxLength(field.validations.maxLength));
      if (field.validations?.pattern) validators.push(Validators.pattern(field.validations.pattern));

      group[`field_${index}`] = new FormControl('', validators);
    });

    this.formGroup = this.fb.group(group);
  }

  submitForm() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const submission = {
      formId: this.formId,
      formName: this.formTemplate.name,
      submittedAt: new Date(),
      data: this.formGroup.value
    };

    this.submissionService.saveSubmission(submission);
    this.isSubmitted = true;
  }
  onCheckboxChange(ev:Event, index:number){

  }
}

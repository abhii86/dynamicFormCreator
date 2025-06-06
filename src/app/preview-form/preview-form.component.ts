import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup,ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { FormTemplateService } from '../core/services/form-template.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf, NgFor, NgSwitch,NgSwitchCase, CommonModule } from '@angular/common';

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
@Component({
  selector: 'app-preview-form',
  standalone:true,
  imports: [ReactiveFormsModule,FormsModule,NgIf, NgFor, NgSwitch,NgSwitchCase,CommonModule, 
            MatFormFieldModule,MatInputModule,MatIconModule,MatDatepickerModule,
            MatListModule, MatButton, MatSelectModule,MatCheckboxModule, MatRadioModule,
            MatNativeDateModule, MatButtonModule
  ],
  templateUrl: './preview-form.component.html',
  styleUrl: './preview-form.component.scss'
})
export class PreviewFormComponent implements OnInit{
  protected displayForm!:FormGroup;
  protected formDefinition:any[]=[];
  protected newFormDefinition:any={};
  protected oldFormDefinition:any={};
  
  constructor(private myFormBuilder:FormBuilder, private formTemplateService:FormTemplateService,
    private router:Router, private activeRoute:ActivatedRoute){}
    
  ngOnInit(): void {
    this.displayForm = this.myFormBuilder.group({});
    let currentUrl = this.router.url.split('/');
    let formId = currentUrl[currentUrl.length-1];

    this.formDefinition = this.formTemplateService.getFormById(formId).fields;

    this.formDefinition.forEach((control) =>{
      this.newFormDefinition[control.label] = control;
      this.newFormDefinition[control.label].value = '';
    });

    for (let key in this.newFormDefinition) {
      const field = this.newFormDefinition[key];
      this.displayForm.addControl(
        key,
        this.myFormBuilder.control(field.value, field.required ? Validators.required : null)
      );
    }
  }
  onSubmit() {
    if (this.displayForm.valid) {
      console.log('Form Submitted', this.displayForm.value);
    } else {
      console.log('Form Invalid');
    }
  }
  navigateTo(){
    this.router.navigate(['/form-list']);
  }
}

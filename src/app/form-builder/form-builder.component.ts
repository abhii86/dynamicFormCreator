import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports:[ReactiveFormsModule, NgFor, NgIf, DragDropModule, FormsModule, MatFormFieldModule,MatInputModule,MatIconModule,MatDatepickerModule,
           MatListModule, MatButton, MatSelectModule,MatCheckboxModule, MatRadioModule,
           MatNativeDateModule, MatButtonModule,MatCardModule],
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  availableFields = ['Text', 'Textarea', 'Dropdown', 'Checkbox', 'Radio', 'Date'];
  formFields: any[] = [];
  selectedFieldIndex: number | null = null;
  formMeta: FormGroup;
  editingField: any = null;
  formId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private formService: FormTemplateService,
    private router: Router
  ) {
    this.formMeta = this.fb.group({
      name: ['']
    });
  }

  ngOnInit(): void {
    this.formId = this.route.snapshot.paramMap.get('id');
    if (this.formId) {
      const form = this.formService.getFormById(this.formId);
      if (form) {
        this.formFields = form.fields || [];
        this.formMeta.patchValue({ name: form.name });
      }
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.formFields, event.previousIndex, event.currentIndex);
  }
  
  addField(type: string) {
    const field: any = {
      type,
      label: `${type} Field`,
      required: false,
      helpText: '',
      options: ['Option 1', 'Option 2'],
      validations: {}
    };
    this.formFields.push(field);
  }

  editField(index: number) {
    this.selectedFieldIndex = index;
    this.editingField = { ...this.formFields[index] };
  }

  saveField() {
    if (this.selectedFieldIndex !== null) {
      this.formFields[this.selectedFieldIndex] = this.editingField;
      this.selectedFieldIndex = null;
      this.editingField = null;
    }
  }

  deleteField(index: number) {
    this.formFields.splice(index, 1);
    this.editingField = null;
  }

  saveForm() {
    const formTemplate = {
      id: this.formId || '',
      name: this.formMeta.value.name,
      fields: this.formFields
    };
    this.formService.saveForm(formTemplate);
    alert('Form saved successfully!');
    this.router.navigate(['/form-list']);
  }
}

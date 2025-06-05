import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubmissionService } from '../core/services/submission.service';
import { FormTemplateService } from '../core/services/form-template.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-submitted-data',
  standalone: true,
  imports:[CommonModule, NgFor, NgIf],
  templateUrl: './submitted-data.component.html',
  styleUrls: ['./submitted-data.component.scss']
})
export class SubmittedDataComponent implements OnInit {
  formId: string = '';
  formName: string = '';
  submissions: any[] = [];
  fields: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private submissionService: SubmissionService,
    private formTemplateService: FormTemplateService
  ) {}

  ngOnInit(): void {
    this.formId = this.route.snapshot.paramMap.get('id') || '';
    const form = this.formTemplateService.getFormById(this.formId);
    if (form) {
      this.formName = form.name;
      this.fields = form.fields;
    }
    this.submissions = this.submissionService.getSubmissionsByFormId(this.formId);
  }
}

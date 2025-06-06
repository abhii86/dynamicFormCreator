import { Routes } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { FormListComponent } from '../app/form-list/form-list.component';
import { FormBuilderComponent } from '../app/form-builder/form-builder.component';
import { FillFormComponent } from '../app/fill-form/fill-form.component';
import { SubmittedDataComponent } from '../app/submitted-data/submitted-data.component';
import { AuthGuard } from '../app/core/guards/auth-guard.guard';
import { PreviewFormComponent } from './preview-form/preview-form.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'builder', component: FormBuilderComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'builder/:id', component: FormBuilderComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'preview/:id', component: PreviewFormComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'form-list', component: FormListComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'fill/:id', component: FillFormComponent, canActivate: [AuthGuard], data: { role: 'User' } },
  { path: 'submitted-data/:id', component: SubmittedDataComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } }
];
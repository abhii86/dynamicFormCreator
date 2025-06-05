import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

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
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatIconModule,MatDatepickerModule,
           MatListModule, MatButton, MatSelectModule,MatCheckboxModule, MatRadioModule,
           MatNativeDateModule, MatButtonModule,MatCardModule, MatOptionModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  selectedRole: 'Admin' | 'User' = 'User';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.selectedRole);
    if (this.selectedRole === 'Admin') {
      this.router.navigate(['/form-list']);
    } else {
      this.router.navigate(['/fill']);
    }
  }
}

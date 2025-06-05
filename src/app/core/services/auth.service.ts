import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private role: 'Admin' | 'User' | null = null;

  login(role: 'Admin' | 'User') {
    this.role = role;
    localStorage.setItem('userRole', role);
  }

  logout() {
    this.role = null;
    localStorage.removeItem('userRole');
  }

  getRole(): 'Admin' | 'User' | null {
    return this.role || (localStorage.getItem('userRole') as 'Admin' | 'User' | null);
  }

  isLoggedIn(): boolean {
    return this.getRole() !== null;
  }
}

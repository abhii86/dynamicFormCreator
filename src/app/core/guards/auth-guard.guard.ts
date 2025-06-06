import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
    const user = localStorage.getItem('userRole') || null;
    const router = inject(Router);

    if (!user) {
      router.navigate(['/login']);
      return false;
    }

    const allowedRoles = route.data['role'] as string[];
    if (allowedRoles && !allowedRoles.includes(user)) {
      alert('Unauthorized');
      router.navigate(['/login']);
      return false;
    }

    return true;
};

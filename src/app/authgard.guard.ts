import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';


export const authgardGuard: CanActivateFn = (route, state) => {
    const paymentStatus = sessionStorage.getItem('PaymentStatus');
  const router = inject(Router);

  if (!paymentStatus) {
    router.navigate(['/subscription']);
    return false;
  }

  return true;
};

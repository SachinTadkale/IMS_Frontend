import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './Services/AuthenticationService/authentication.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const authgardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(AuthenticationService);

  return userService.getUserById().pipe(
    map((user) => {
      console.log('User data:', user);
      if (user.status === 'ACTIVE' && user.paymentStatus) {
        return true;
      } else {
        // Redirect to subscription if paymentStatus is false
        return router.parseUrl('/subscription');
      }
    }),
    catchError((error) => {
      // If error (e.g., not logged in), redirect to login
      return of(router.parseUrl('/login'));
    })
  );
};

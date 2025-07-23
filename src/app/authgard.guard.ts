import { CanActivateFn } from '@angular/router';

export const authgardGuard: CanActivateFn = (route, state) => {
  return true;
};

import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';


export const authgardGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
 
  const checkPyament = localStorage.getItem('PaymentKey');


  

     if (!checkPyament) {
    router.navigate(['/subscription']);
    return false;
  


  }

  

 

 

  return true;
};

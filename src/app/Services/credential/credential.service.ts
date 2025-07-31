import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {
  

 setCredential(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getCredential(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeCredential(key: string): void {
    localStorage.removeItem(key);
  }

  setPaymentStatus(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getPaymentStatus(key: string): string | null {
    return localStorage.getItem(key);
  }

  removePaymentStatus(key: string): void {
    localStorage.removeItem(key);
  }

}

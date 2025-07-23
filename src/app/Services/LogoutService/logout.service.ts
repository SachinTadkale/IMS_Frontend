import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  timeoutId: any;
  timeoutPeriod: number = 7 * 24 * 60 * 60 * 1000; // 15 minutes

  constructor(private router: Router, private ngZone: NgZone) {
    this.setupTimers();
  }

  setupTimers() {
    this.resetTimer();

    // Events to listen to user activity
    window.addEventListener('mousemove', () => this.resetTimer());
    window.addEventListener('keydown', () => this.resetTimer());
    window.addEventListener('click', () => this.resetTimer());
    window.addEventListener('scroll', () => this.resetTimer());
  }

  resetTimer() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    // Use NgZone to avoid Angular change detection issues
    this.ngZone.runOutsideAngular(() => {
      this.timeoutId = setTimeout(() => {
        this.ngZone.run(() => {
          this.logout();
        });
      }, this.timeoutPeriod);
    });
  }

  logout() {
    // Remove token / clear session storage
    localStorage.removeItem('token'); // adjust as needed

    // Navigate to login page
    this.router.navigate(['/login']);
    alert('Session expired! You have been logged out.');
  }
}

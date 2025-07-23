import { Component } from '@angular/core';
import { AuthenticationService } from '../../../Services/AuthenticationService/authentication.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {

    email: string = '';
  otp: string = '';
  otpSent: boolean = false;
  message: string = '';

  constructor(private otpService: AuthenticationService, private router: Router) {}

  sendOtp() {
    this.otpService.sendOtp(this.email).subscribe({
      next: (response) => {
        this.otpSent = true;
        this.message = response.message;
      },
      error: () => {
        this.message = 'Failed to send OTP.';
      }
    });
  }

  verifyOtp() {
    this.otpService.verifyOtp(this.email, this.otp).subscribe({
      next: (response) => {
        this.message = response.message;
         // Navigate and pass data using router state
      this.router.navigate(['/signup'], { state: { email: this.email } });
      },
      error: () => {
        this.message = 'Invalid OTP.';
      }
    });
  }

  cancel() {
  this.email = '';
  this.otp = '';
  this.otpSent = false;
  this.message = '';
}


}

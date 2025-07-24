import { Component } from '@angular/core';
import { AuthenticationService } from '../../../Services/AuthenticationService/authentication.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
})
export class OtpComponent {
  email: string = '';
  otp: string = '';
  otpSent: boolean = false;
  message: string = '';
  isLoading: boolean = false;

  constructor(
    private otpService: AuthenticationService,
    private router: Router
  ) {}

  sendOtp() {
    this.otpService.sendOtp(this.email).subscribe({
      next: (response) => {
        this.otpSent = true;
        alert("OTP sent Successfully on Your Email");
      },
      error: (err) => {
        if (err.status === 404) {
          alert('Email not found');
        } else if (err.status === 401) {
          alert('Invalid OTP');
        } else {
          alert('Something went wrong. Please try again.');
        }
      },
    });
  }

  verifyOtp() {
  this.otpService.verifyOtp(this.email, this.otp).subscribe({
    next: (response) => {
      if (response.success) {
        alert("Email Verified Successfully");
        this.router.navigate(['/forgot-password']);
      } else {
        alert("Invalid OTP or verification failed.");
      }
    },
    error: (err) => {
      console.error('OTP verification error:', err);
      alert("Something went wrong. Please try again.");
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

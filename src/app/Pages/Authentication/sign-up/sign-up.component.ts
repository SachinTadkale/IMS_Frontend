import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../Services/AuthenticationService/authentication.service';
import { UserData } from '../../../model/User-Data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  emailVerified: boolean = false;
  otp: any;
  otpSent: boolean = true;
  isLoading: boolean = false;

  signupData: UserData = {
    full_name: '',
    email: '',
    store_type: '',
    password: '',
    role: 'USER',
  };

  confirm_password = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private otpService: AuthenticationService
  ) {
    const nav = history.state;
    this.signupData.email = nav.email;
  }

  ngOnInit(): void {
    const storeType = this.route.snapshot.paramMap.get('storeType');
    console.log('Received ID:', storeType);
    if (storeType != null) {
      this.signupData.store_type = storeType;
    }
  }

  sendOtp() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!this.signupData.email) {
      alert('Please enter your email.');
      return;
    }

    if (!emailPattern.test(this.signupData.email)) {
      alert('Email format is invalid.');
      return;
    }
    this.isLoading = true;
    this.otpService.sendOtp(this.signupData.email).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.otpSent = true;
        alert(response.message);
      },
      error: () => {
        alert('Failed to send OTP.');
        this.isLoading = false;
      },
    });
  }

  cancel() {
    this.otpSent = false;
  }

  verifyOtp() {
    if (!this.otp) {
      alert('OTP is required.');
      return;
    }
    this.isLoading = true;
    this.otpService.verifyOtp(this.signupData.email, this.otp).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.emailVerified = true;
        alert(response.message);
      },
      error: () => {
        alert('Invalid OTP.');
      },
    });
  }

  OnSignUp() {
    // Trim all fields
    this.signupData.full_name = this.signupData.full_name.trim();
    this.signupData.email = this.signupData.email.trim();
    this.signupData.store_type = this.signupData.store_type.trim();
    this.signupData.password = this.signupData.password.trim();
    this.confirm_password = this.confirm_password.trim();

    // Check if all fields are filled
    if (
      this.signupData.full_name &&
      this.signupData.email &&
      this.signupData.password
    ) {
      // Check if passwords match
      if (this.signupData.password === this.confirm_password) {
        const signupRequest = {
          ...this.signupData,
          status: 'PENDING',
        };

        this.authenticationService.register(signupRequest).subscribe({
          next: (response) => {
            alert(response.message);
            this.router.navigate(['/subscription']);

            // Reset fields
            this.signupData = {
              full_name: '',
              email: '',
              store_type: '',
              password: '',
              role: 'USER',
            };
            this.confirm_password = '';
          },
          error: (error) => {
            console.error('Error during signup:', error);
            alert(error.error?.message || 'Signup failed.');
          },
        });
      } else {
        alert('Passwords do not match');
      }
    } else {
      alert('Please fill all the required fields.');
    }
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Toggle confirm password visibility
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}

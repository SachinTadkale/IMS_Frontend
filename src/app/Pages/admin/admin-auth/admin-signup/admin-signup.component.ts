import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css'],
  standalone: true,
  imports: [FormsModule], // ✅ Add this line
})
export class AdminSignupComponent {
  signupData = {
    username: '',
    email: '',
    otp: '',
    password: '',
    confirmPassword: '',
  };

  isOtpSent = false;

  sendOtp() {
    if (!this.signupData.email) {
      alert('Please enter your email first!');
      return;
    }

    console.log('Sending OTP to:', this.signupData.email);
    this.isOtpSent = true;
  }

  onAdminSignup() {
    if (!this.signupData.otp) {
      alert('Please enter the OTP sent to your email');
      return;
    }

    console.log('Signup data:', this.signupData);
  }
}

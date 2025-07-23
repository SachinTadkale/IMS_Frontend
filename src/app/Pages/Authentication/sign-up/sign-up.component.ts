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
  otp: any;
  verifyOtp() {
    throw new Error('Method not implemented.');
  }
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
    private route:ActivatedRoute
  ) {
    const nav = history.state;
    this.signupData.email = nav.email;
  }

  ngOnInit(): void {
    const storeType = this.route.snapshot.paramMap.get('storeType');
    console.log('Received ID:', storeType);
    if(storeType!=null){
      this.signupData.store_type = storeType;
    }
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

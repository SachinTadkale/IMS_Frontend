import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService, AuthRequest } from '../../../Services/AuthenticationService/authentication.service';
import {  FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Fixed the typo
})
export class LoginComponent {
  
  loginData: AuthRequest = {
    username: '',
    password: ''
  };

  showPassword: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  onLogin() {
    if (this.loginData.username && this.loginData.password) {
      this.authenticationService.login(this.loginData).subscribe({
        next: (res) => {
          alert('Login Successful!');

          // Save token to localStorage (or sessionStorage)
          localStorage.setItem("token",res);


          // Navigate to home/dashboard
          this.router.navigate(['/electronics-store-home']);
        },
        error: (error: HttpErrorResponse) => {
        
          if (error.status === 401) {
            alert('Invalid username or password. Please try again.');
          } 
          else if (error.status === 500) {
            alert('Server error. Please try again later.');
          }
          else if (error.status === 0) {
            alert('Network error. Please check your internet connection.');
          }
          else if (error.status === 403) {
            alert('Access denied. You do not have permission to access this resource.');
          }
          else if (error.status === 406) {
            this.router.navigate(['/subscription']);
          }
          
          else {
            alert('An error occurred during login. Please try again later.');
          }
          
        }
      });
    } else {
      alert('Please fill in all fields.');
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService, AuthRequest } from '../../../Services/AuthenticationService/authentication.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { UserData } from '../../../model/User-Data';
import { AdminService } from '../../../Services/AdminService/admin-service.service';
import { CredentialService } from '../../../Services/credential/credential.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData: AuthRequest = {
    username: '',
    password: ''
  };

  user: UserData = {
    id: 0,
    full_name: '',
    email: '',
    store_type: '',
    password: '',
    status: '',
    role: ''
  };

  showPassword: boolean = false;
  randomKey:string ='';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private credentialService: CredentialService
  ) {}

  onLogin() {
    if (this.loginData.username && this.loginData.password) {
      this.authenticationService.login(this.loginData).subscribe({
        next: (res) => {
          alert('Login Successful!');

         const userKey = localStorage.getItem('username');
         const paykey = localStorage.getItem('PaymentKey');
         const imsToken = localStorage.getItem('imsToken');

         if(userKey || paykey || imsToken){
          localStorage.removeItem('username');
          localStorage.removeItem('PaymentKey');
          localStorage.removeItem('imsToken');
          
         }

         localStorage.setItem('username',this.loginData.username);
         localStorage.setItem('imsToken',res);
       

         

          this.fetchUser();
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 401) {
            alert('Invalid username or password. Please try again.');
          } else if (error.status === 500) {
            alert('Server error. Please try again later.');
          } else if (error.status === 0) {
            alert('Network error. Please check your internet connection.');
          } else if (error.status === 403) {
            alert('Access denied. You do not have permission to access this resource.');
          } else if (error.status === 406) {
            this.router.navigate(['/subscription']);
          } else {
            alert('An error occurred during login. Please try again later.');
          }
        }
      });
    } else {
      alert('Please fill in all fields.');
    }
  }

  fetchUser() {
    this.authenticationService.getUserById().subscribe({
      next: (respUser: UserData) => {
        this.user = respUser;

        // Move navigation here, after user data is fetched
        if (this.user.status === 'ACTIVE') {
          localStorage.setItem('PaymentKey','ACTIVE');
          this.router.navigate(['/electronics-store-home']);
         
        } else {


          this.router.navigate(['/subscription']);
        }


      },
      error: (error) => {
        console.error("Error while fetching user", error);
        // Optionally handle error or redirect
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

 
}

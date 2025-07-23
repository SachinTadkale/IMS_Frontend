import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService, AuthRequest } from '../../../../Services/AuthenticationService/authentication.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {



  username = '';
  password = '';

   loginData: AuthRequest = {
      username: '',
      password: ''
    };

    constructor(private router:Router, private authenticationService:AuthenticationService){}
  
  OnAdminLogin(){
    if (this.loginData.username && this.loginData.password) {
      this.authenticationService.login(this.loginData).subscribe({
        next: (res) => {
          alert('Login Successful!');

          // Save token to localStorage (or sessionStorage)
          localStorage.setItem('token', res);


          // Navigate to home/dashboard
          this.router.navigate(['/adminDashboard']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          alert('Invalid credentials, please try again.');
        }
      });
    } else {
      alert('Please fill in all fields.');
    }
}

}

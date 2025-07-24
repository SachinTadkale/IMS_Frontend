import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../Services/AuthenticationService/authentication.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-forgotpass',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './forgotpass.component.html',
  styleUrl: './forgotpass.component.css',
})
export class ForgotpassComponent implements OnInit {
   email: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    // Get email from route param
    this.route.params.subscribe((params) => {
      this.email = params['email'];
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  resetPassword() {
  console.log('Reset Password function triggered');
  console.log('Email:', this.email);
  console.log('Password:', this.password);
  console.log('Confirm Password:', this.confirmPassword);

  if (this.password !== this.confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  const params = new HttpParams()
    .set('email', this.email)
    .set('newPassword', this.password);

  this.http
    .put('http://localhost:8080/api/reset-password', null, { params })
    .subscribe({
      next: () => {
        alert('Password updated successfully');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Reset error:', err);
        alert('Failed to update password');
      },
    });
}

}

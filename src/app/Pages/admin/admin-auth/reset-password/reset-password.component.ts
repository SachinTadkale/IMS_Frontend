import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // ✅ Added RouterModule
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  role: string = '';
  resetData = {
    email: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.role = this.route.snapshot.paramMap.get('role') || 'user';
  }

  onResetPassword() {
    const { email, newPassword, confirmPassword } = this.resetData;

    if (!email || !newPassword || !confirmPassword) {
      alert('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    alert('Password reset successfully!');

    if (this.role === 'admin') {
      this.router.navigate(['/adminLogin']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user = {
    name: 'Sakshi',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    address: '123, Main Street, New York'
  };
  constructor(private router: Router) {}  // ✅ Inject Router

  // ✅ Function to Navigate Back to Dashboard
  goToDashboard() {
    this.router.navigate(['/grocery_dashboard']); // Make sure this matches your routes
  }
}



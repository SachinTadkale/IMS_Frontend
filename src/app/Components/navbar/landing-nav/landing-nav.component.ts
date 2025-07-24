import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../Services/AuthenticationService/authentication.service';

@Component({
  selector: 'app-landing-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing-nav.component.html',
  styleUrl: './landing-nav.component.css',
})
export class LandingNavComponent {
  constructor(private router: Router, private authenticationService:AuthenticationService) {}
  navigate(event: Event) {
    const selectedStore = (event.target as HTMLSelectElement).value;

    if (
      selectedStore == 'Grocery' ||
      selectedStore == 'Hardware' ||
      selectedStore == 'Electronics' ||
      selectedStore == 'signup'
    ) {
      this.router.navigate(['/signup',selectedStore]);
     // this.router.navigate(['/verifyEmail']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logOut(){
      // Optionally, clear token from localStorage or sessionStorage
      localStorage.removeItem('token');
      // Redirect to login page
      this.router.navigate(['/landing']);
    
    
  }
  navigateAdmin(event: any) {
  const value = event.target.value;
  if (value === 'adminSignup') {
    this.router.navigate(['/adminSignup']);
  } else if (value === 'adminLogin') {
    this.router.navigate(['/adminLogin']);
  }
}
}
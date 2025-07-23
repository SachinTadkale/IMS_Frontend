import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../../Services/AuthenticationService/authentication.service';

@Component({
  selector: 'app-electronics-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './electronics-nav.component.html',
  styleUrl: './electronics-nav.component.css'
})
export class ElectronicsNavComponent {

  constructor(private router: Router, private authenticationService: AuthenticationService){}

  logOut(){
   
      // Optionally, clear token from localStorage or sessionStorage
      localStorage.removeItem('token');
      // Redirect to login page
      this.router.navigate(['/landing']);
   
    
  }


  

}

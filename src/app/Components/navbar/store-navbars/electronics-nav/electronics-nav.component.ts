import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../../Services/AuthenticationService/authentication.service';
import { LogoutService } from '../../../../Services/LogoutService/logout.service';

@Component({
  selector: 'app-electronics-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './electronics-nav.component.html',
  styleUrl: './electronics-nav.component.css'
})
export class ElectronicsNavComponent {

  constructor(private router: Router, private authenticationService: AuthenticationService, private logoutService:LogoutService){}

  logOut(){
    
   this.logoutService.logout();
    
  }


  

}

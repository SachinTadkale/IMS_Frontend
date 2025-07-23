import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard-nav.component.html',
  styleUrl: './dashboard-nav.component.css',
})
export class DashboardNavComponent {
  storedUser = localStorage.getItem('name');
  uname: any = this.storedUser;
  constructor(private router:Router){}
  logout() {
    if (localStorage.getItem('username')) {
      localStorage.removeItem('username');
    }
  }
  storeHome(){
    this.router.navigate(
      [{ outlets: { primary: ['electronics-store-home'], outlet2: null } }]
    );
  }
  profile(){
    this.router.navigate(
      // [{ outlets: { primary: ['electronics-user-profile'], outlet2: null } }]
      [{ outlets: { primary: ['user-profile'], outlet2: null } }]
    );
  }
}

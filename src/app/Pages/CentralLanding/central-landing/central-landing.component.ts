import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../Services/AdminService/admin-service.service';
import { UserData } from '../../../model/User-Data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-central-landing',
  standalone: true,
  imports: [],
  templateUrl: './central-landing.component.html',
  styleUrl: './central-landing.component.css'
})
export class CentralLandingComponent implements OnInit {

  userData: UserData ={
    id:0,
    full_name: '',
    email: '',  
    store_type: '',
    password: '',
    status: '',
  }
  constructor(private adminService: AdminService, private router:Router) {}

  ngOnInit(): void {
   
    this.fetchUserData();
  }

  fetchUserData() {
   
    this.adminService.getUserById().subscribe({
      next: (response) => {
        this.userData = response;
       

        if (response.status === 'ACTIVE') {
          this.router.navigate(['/electronics-store-home']);
        } else {
          console.log(response);
          this.router.navigate(['/subscription']);
        }
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
  }

}

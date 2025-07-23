import { Component, OnInit } from '@angular/core';
import { AsideComponent } from '../aside/aside.component';
import { DashboardNavComponent } from "../dashboard-nav/dashboard-nav.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-userdashboard',
  standalone: true,
  imports: [AsideComponent, DashboardNavComponent],
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.css'
})
export class UserdashboardComponent implements OnInit {

  constructor(private router: Router){}

ngOnInit(): void {

  this.router.navigate([{ outlets: { outlet2: ['electronics-user-dashboard-home'] } }]);
    
}

}

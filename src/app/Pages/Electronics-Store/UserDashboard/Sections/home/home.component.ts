import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeroComponent } from "../hero/hero.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,HeroComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

   constructor(private router:Router){}

  ngOnInit(): void {

  
    this.router.navigate([{ outlets: { outlet2: ['electronics-user-dashboard-home'] } }]);
      
  }

}

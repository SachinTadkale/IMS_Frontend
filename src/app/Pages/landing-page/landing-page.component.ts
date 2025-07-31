import { Component,CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { LandingNavComponent } from '../../Components/navbar/landing-nav/landing-nav.component';
import { LandingFooterComponent } from '../../Components/footer/landing-footer/landing-footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [LandingNavComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingPageComponent implements OnInit {

  constructor(private router:Router){}

  ngOnInit(): void {
      if (localStorage.getItem('imsToken')){

        
        console.log("token exist");
        this.router.navigate(['/electronics-store-home']);

      }else{
        console.log("no token exist");
        
      }
  }

}

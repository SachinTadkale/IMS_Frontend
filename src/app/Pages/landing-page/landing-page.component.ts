import { Component,CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { LandingNavComponent } from '../../Components/navbar/landing-nav/landing-nav.component';
import { LandingFooterComponent } from '../../Components/footer/landing-footer/landing-footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [LandingNavComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingPageComponent implements OnInit {

  ngOnInit(): void {
      if (localStorage.getItem('token')){

        localStorage.removeItem('token');
        console.log("token exist");

      }
  }

}

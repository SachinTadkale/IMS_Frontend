import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoutService } from './Services/LogoutService/logout.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'IMS_Frontend';

  constructor(private LogoutService: LogoutService){}
}

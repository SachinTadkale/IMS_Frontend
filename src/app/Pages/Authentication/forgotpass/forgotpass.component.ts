import { Component } from '@angular/core';
import { AuthRequest } from '../../../Services/AuthenticationService/authentication.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgotpass',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgotpass.component.html',
  styleUrl: './forgotpass.component.css'
})
export class ForgotpassComponent {


  isEmailExist:boolean = false;

onLogin() {
throw new Error('Method not implemented.');
}

  loginData: AuthRequest = {
      username: '',
      password: ''
    };

    showPassword: boolean = false;

verifyEmail() {
this.isEmailExist = true;
}
  
 togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}

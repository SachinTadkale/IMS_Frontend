import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../Services/UserProfileService/user-profile.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProfile } from '../../../model/userProfile/user-profile';
import { UserData } from '../../../model/User-Data';
import { AdminService } from '../../../Services/AdminService/admin-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'] 
})
export class UserProfileComponent implements OnInit {

  ngOnInit(): void {
      
  }

   user = {
    photoUrl: 'assets/profile.png', // replace with your actual path
    name: 'Jessica Alba',
    username: 'jennywilson',
    details: {
      Username: 'Jenny Wilson',
      Email: 'jenny@gmail.com',
      Address: 'New York, USA',
      Nickname: 'Sky Angel',
      DOB: 'April 28, 1981'
    }
  };

  editField: string | null = null;

  startEdit(field: string) {
    this.editField = field;
  }

  saveEdit() {
    this.editField = null;
  }
}

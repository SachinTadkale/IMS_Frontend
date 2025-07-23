import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  profileForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['John Doe'],
      email: ['john@example.com'],
      phone: ['123-456-7890'],
      subscriptionType: ['Premium'],
      joinDate: ['2023-08-10']
    });
  }

  onSubmit(): void {
    console.log('Updated Profile:', this.profileForm.value);
    // You can send the updated data to your backend here
  }

}

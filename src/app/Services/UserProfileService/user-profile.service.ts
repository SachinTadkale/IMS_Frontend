import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private apiUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {}

  getUserProfile() {
    return this.http.get<any>(`${this.apiUrl}/profile`);
  }

  updateUserProfile(user: any) {
    return this.http.put(`${this.apiUrl}/update`, user);
  }

  uploadProfileImage(formData: FormData) {
    return this.http.post(`${this.apiUrl}/upload-image`, formData);
  }
}

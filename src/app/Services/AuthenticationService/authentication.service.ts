import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../../model/User-Data';

export interface AuthRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Helper to build headers with token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('imsToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  sendOtp(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.post(`${this.baseUrl}/sendOtp`, null, { params });
  }

  verifyOtp(email: string, otp: string): Observable<any> {
    const params = new HttpParams().set('email', email).set('otp', otp);

    return this.http.post(`${this.baseUrl}/verifyOtp`, null, { params });
  }

  register(user: UserData): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user, {
      responseType: 'json',
    });
  }

  login(authRequest: AuthRequest): Observable<string> {
    return this.http.post(`${this.baseUrl}/login`, authRequest, {
      responseType: 'text',
    });
  }

  getUserById(): Observable<UserData> {
    return this.http.get<UserData>(`${this.baseUrl}/getUserById`, {
      headers: this.getAuthHeaders(),
    });
  }

  resetPassword(email: string, newPassword: string): Observable<any> {
  const params = new HttpParams()
    .set('email', email)
    .set('newPassword', newPassword);

  return this.http.put(`${this.baseUrl}/reset-password`, null, { params });
}

}

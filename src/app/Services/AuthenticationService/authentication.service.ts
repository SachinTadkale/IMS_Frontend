import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../../model/User-Data';

export interface AuthRequest {
  username: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

   sendOtp(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.post(`${this.baseUrl}/sendOtp`, null, { params });
  }

  verifyOtp(email: string, otp: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('otp', otp);
    return this.http.post(`${this.baseUrl}/verifyOtp`, null, { params });
  }

  register(user: UserData): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user, { responseType: 'json' });
  }


  login(authRequest: AuthRequest): Observable<string> {
    return this.http.post(`${this.baseUrl}/login`, authRequest, { responseType: 'text' });
  }
  

}

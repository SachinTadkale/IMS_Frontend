import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from '../../model/User-Data';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Helper to build headers with token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('adminToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Get all users
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/users`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Approve user (set status to ACTIVE)
  approveUser(id: number) {
    return this.http.put<{ message: string }>(
      `${this.apiUrl}/approve/${id}`,
      {},
      { headers: this.getAuthHeaders(),
        responseType: 'text' as 'json',
       }
    );
  }

  // Reject user (set status to REJECTED)
  rejectUser(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/reject/${id}`, null, {
      headers: this.getAuthHeaders(),
    });
  }

  
}

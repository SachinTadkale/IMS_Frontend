import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Seller } from '../../model/seller/seller';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

uploadFormData(formData: FormData): Observable<any> {

  const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/addSellerImg`, formData,{headers});
  }

  updateSeller(id: string, seller: Seller): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, seller, {
      headers: this.getAuthHeaders(),
    });
  }

  getSellers(): Observable<Seller[]> {
    return this.http.get<Seller[]>(`${this.apiUrl}/my-sellers`, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteSeller(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}

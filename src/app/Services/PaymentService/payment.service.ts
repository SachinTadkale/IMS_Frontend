import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FetchSubscription } from '../../model/FetchSubscription/fetch-subscription';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:8080/api/payment';  // adjust as needed

  constructor(private http: HttpClient) {}

  createPayment(title: string, amount: number, description: string, transactionId: string, screenshot: File) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('amount', amount.toString());
    formData.append('description', description);
    formData.append('transactionId', transactionId);
    formData.append('screenshot', screenshot);

    const token = localStorage.getItem('imsToken');  // adjust key if needed
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;

    return this.http.post(`${this.apiUrl}/create`, formData, { headers });
  }

  getImageByTransactionId(transactionId: number) {
    return `${this.apiUrl}/image/${transactionId}`;  
  }

  getTransactionsByUserId(userId: number): Observable<FetchSubscription[]> {
    const url = `${this.apiUrl}/byUser/${userId}`;

    const token = localStorage.getItem('adminToken');  // adjust key if needed

    const headers = token
      ? new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        })
      : new HttpHeaders({
          'Content-Type': 'application/json'
        });

    return this.http.get<FetchSubscription[]>(url, { headers });
  }
}

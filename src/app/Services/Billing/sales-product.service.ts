import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddToCartService } from '../AddToCartService/add-to-cart-service.service';

@Injectable({
  providedIn: 'root'
})
export class SalesProductService {

  private apiUrl = 'http://localhost:8080/api/addBill';
  private getCount = 'http://localhost:8080/api/count';
  private getBills = 'http://localhost:8080/api/fetchAllBillsByUser';

  constructor(private http: HttpClient, private cartService: AddToCartService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  saveBill(billData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.apiUrl , billData, {headers});
  }
  
  
  getAllBill(): Observable<number> {
    const headers = this.getAuthHeaders();
    return this.http.get<number>(this.getCount, { headers });
  }

  getAllCustomers(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(this.getBills, { headers });
  }

}

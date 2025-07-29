import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  addProduct(productData: any, imageFile: File, token: string) {
    const formData = new FormData();

    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    formData.append('quantity', productData.quantity);
    formData.append('description', productData.description);
    formData.append('gstType', productData.gstType);
    formData.append('gstRate', productData.gstRate);
    formData.append('image', imageFile);

    formData.forEach((value, key) => console.log(key, value));

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    console.log(headers.get('Authorization'));

    return this.http.post(`${this.apiUrl}/addProduct`, formData, { headers });
  }

  getProducts(): Observable<any[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(`${this.apiUrl}/showProduct`, { headers });
  }

  getProductsByCategory(productCategory: string): Observable<any[]> {
    const token = sessionStorage.getItem('token');
    return this.http.get<any[]>(
      `${this.apiUrl}/products/category/${productCategory}`,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      }
    );
  }

  updateProduct(
    productId: number,
    productData: any,
    imageFile?: File
  ): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const formData = new FormData();
    formData.append('name', productData.name);
    if (productData.price !== undefined)
      formData.append('price', productData.price.toString());
    if (productData.category) formData.append('category', productData.category);
    if (productData.quantity !== undefined)
      formData.append('quantity', productData.quantity.toString());
    if (productData.description)
      formData.append('description', productData.description);
    if (productData.gstType) formData.append('gstType', productData.gstType);
    if (productData.gstRate !== undefined)
      formData.append('gstRate', productData.gstRate.toString());

    if (imageFile instanceof File && imageFile.size > 0) {
      formData.append('image', imageFile);
    }

    return this.http.put(
      `${this.apiUrl}/updateProduct/${productId}`,
      formData,
      { headers }
    );
  }

  getImageUrl(productId: number): string {
    return `${this.apiUrl}/getImage/${productId}`;
  }

  deleteProduct(productId: number): Observable<any> {
    const token = sessionStorage.getItem('token'); // assuming token is stored here
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<string>(
      `${this.apiUrl}/deleteProduct/${productId}`,
      { headers }
    );
  }
}

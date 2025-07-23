import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../../model/review/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) {}

  // Helper to build headers with token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

   addReviewWithImage(
    reviewerName: string,
    comment: string,
    rating: number,
    imageFile: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('reviewerName', reviewerName);
    if (comment) formData.append('comment', comment);
    if (rating !== null && rating !== undefined) formData.append('rating', rating.toString());
    formData.append('image', imageFile);

    const token = localStorage.getItem('token'); // or sessionStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.baseUrl}/addReviewImg`, formData, { headers });
  }

  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}/addReview`, review, { 
      headers: this.getAuthHeaders()
    });
  }

  getreviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/my-reviews`, { 
      headers: this.getAuthHeaders()
    });
  }
}

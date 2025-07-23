import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Review } from '../../../../../model/review/review';
import { ReviewService } from '../../../../../Services/reviewService/review.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

 reviews: any[] = [];

  stars: number[] = [1, 2, 3, 4, 5];
  hoverRating: number = 0;

  newReview: Review = {
    id: 0,
    reviewerName: '',
    comment: '',
    rating: 0,
    imagePath:''
  };

  selectedFile: File | null = null;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  onFileSelected(event: Event, inputFile:HTMLInputElement) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
    }
  }

  setRating(rating: number) {
    this.newReview.rating = rating;
  }

  addSellerWithImg() {
    if (!this.selectedFile) {
      alert('Please select an image file');
      return;
    }

    this.reviewService.addReviewWithImage(
      this.newReview.reviewerName,
      this.newReview.comment,
      this.newReview.rating,
      this.selectedFile
    ).subscribe({
      next: res => {
   
        alert('Review added successfully!');
        this.loadReviews();
        this.resetForm();
      },
      error: err => {
        console.error(err);
        alert('Error adding seller');
      }
    });
  }

  loadReviews(){
    this.reviewService.getreviews().subscribe({
      next: (response: any) => {
        this.reviews = response;
        console.log('Reviews loaded successfully:', this.reviews);
      },
      error: (error) => {
        console.error('Error while loading reviews:', error);
      } 
    });
  }

  submitReview() {
    this.reviewService.addReview(this.newReview).subscribe({
      next: (response: any) => {
        alert(response.message);
        console.log('Review submitted successfully:', response);
        this.reviews.push(this.newReview);
        // Optionally save to localStorage:
        localStorage.setItem('reviews', JSON.stringify(this.reviews));
        this.resetForm();
      },
      error: (error) => {
        alert("Failed to save review");
        console.error('Error while submitting review:', error);
      }
    });
  }

  resetForm(): void {
    this.newReview = {
      id: 0,
      reviewerName: '',
      comment: '',
      rating: 0,
      imagePath:''
    };
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../Services/productServices/product-service.service';
import { FeaturedCategoriesCardComponent } from '../../../Components/cards/featured-categories-card/featured-categories-card.component';
import { LandingFooterComponent } from '../../../Components/footer/landing-footer/landing-footer.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ElectronicsNavComponent } from '../../../Components/navbar/store-navbars/electronics-nav/electronics-nav.component';

@Component({
  selector: 'app-electronics-store-home',
  standalone: true,
  imports: [
    ElectronicsNavComponent,
    FeaturedCategoriesCardComponent,
    LandingFooterComponent,
    CommonModule,
    RouterLink
  ],
  templateUrl: './electronics-store-home.component.html',
  styleUrl: './electronics-store-home.component.css'
})
export class ElectronicsStoreHomeComponent implements OnInit{
  products: any[] = []; // Store fetched products

  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.loadFeaturedProducts(); // Call function to fetch products
  }

  loadFeaturedProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data.map((product) => ({
          ...product,
          expanded: false, // Add expanded property dynamically
        }));
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  getImageUrl(productId: number): string {
    return this.productService.getImageUrl(productId); // Get image URL
  }

}

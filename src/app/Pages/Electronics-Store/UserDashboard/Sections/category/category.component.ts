import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../../../Services/productServices/product-service.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  productCategory: string = '';
  searchTerm: string = '';
  allProducts: any[] = [];
  filteredProducts: any[] = [];

  categories: string[] = [
    'Smartphone',
    'Laptop & PC',
    'Refrigerator',
    'Washing Machine',
    'AC',
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.allProducts = products;
        this.filteredProducts = products;
      },
      error: (err) => console.error('Failed to load products', err)
    });
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase();

    this.filteredProducts = this.allProducts.filter(p =>
      (!this.productCategory || p.productCategory === this.productCategory) &&
      (
        !this.searchTerm ||
        p.productName?.toLowerCase().includes(term) ||
        p.productCategory?.toLowerCase().includes(term) ||
        p.product_id?.toString().includes(term) ||
        p.product_price?.toString().includes(term) ||
        p.product_available_stock_quantity?.toString().includes(term)
      )
    );
  }

  getImageUrl(product_id: number): string {
    return this.productService.getImageUrl(product_id);
  }
}

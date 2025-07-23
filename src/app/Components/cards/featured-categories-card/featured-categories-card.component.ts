import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../Services/productServices/product-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AddToCartService } from '../../../Services/AddToCartService/add-to-cart-service.service';

@Component({
  selector: 'app-featured-categories-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-categories-card.component.html',
  styleUrl: './featured-categories-card.component.css',
})
export class FeaturedCategoriesCardComponent implements OnInit {
  products: any[] = [];
  expandedIndex: number | null = null;
  selectedProductIds: Set<number> = new Set<number>();

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: AddToCartService
  ) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data.map((product) => ({
          ...product,
          expanded: false,
        }));
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  getImageUrl(productId: number): string {
    return this.productService.getImageUrl(productId);
  }

  toggleDescription(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  toggleProductSelection(product: any): void {
    if (this.selectedProductIds.has(product.product_id)) {
      this.selectedProductIds.delete(product.product_id);
    } else {
      this.selectedProductIds.add(product.product_id);
      this.addToCart(product);
    }
  }

  isProductSelected(productId: number): boolean {
    return this.selectedProductIds.has(productId);
  }

  addToCart(product: any): void {
    const existingItem = this.cartService.cartItems.find(item => item.name === product.product_name);

    if (existingItem) {
      // Update existing item
      existingItem.quantity += 1;
      existingItem.netAmount = existingItem.price * existingItem.quantity;
      existingItem.gstAmount = existingItem.netAmount * existingItem.gstRate / 100;
      existingItem.totalAmount = existingItem.netAmount + existingItem.gstAmount;
    } else {
      // Add new item
      const netAmount = product.product_price;
      const gstAmount = netAmount * product.gst_rate / 100;
      const totalAmount = netAmount + gstAmount;
      const imgurl = this.productService.getImageUrl(product.product_id);
      this.cartService.addToCart({
        id: product.product_id,
        imgurl:imgurl,
        name: product.productName,
        description: product.product_description,
        price: product.product_price,
        quantity: 1,
        netAmount,
        gstType: product.gst_type || 'CGST+SGST',
        gstRate: product.gst_rate,
        gstAmount,
        totalAmount
      });
    }
  }
}

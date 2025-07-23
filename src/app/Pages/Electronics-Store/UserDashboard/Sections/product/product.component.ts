import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../../../Services/productServices/product-service.service';
import { ProductModalComponent } from '../../../../../Components/Modal/product-modal/product-modal.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  isEditMode = false;
  selectedProductId: number | null = null;
  @ViewChild('fileInput') fileInputRef!: ElementRef;
  categories: string[] = [
    'Smartphone',
    'Laptop & PC',
    'Refrigerator',
    'Washing Machine',
    'AC',
  ];
  product = {
    name: '',
    price: '',
    category: '',
    quantity: '',
    description: '',
    gstType: '',
    gstRate: '',
  };

  imageFile: File | null = null;
  productsArray: any[] = [];
  filteredProducts: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (resPro) => {
        this.filteredProducts = resPro;
      },
    });
  }

  // Save or Update based on mode
  onSubmit(event: Event) {
    event.preventDefault();
    this.isEditMode ? this.updateProduct() : this.saveProduct();
    this.resetFormState();
  }

  saveProduct() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('User not authenticated');
      return;
    }

    if (!this.imageFile) {
      alert('Please select an image file.');
      return;
    }

    const productData = { ...this.product };

    this.productService
      .addProduct(productData, this.imageFile, token)
      .subscribe({
        next: () => {
          alert('Product added successfully');
          this.resetFormState();
          this.loadProducts();
        },
        error: () => {
          alert('Failed to add product');
        },
      });
  }

  updateProduct() {
    if (!this.selectedProductId) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('User not authenticated');
      return;
    }

    const productData = { ...this.product };

    this.productService
      .updateProduct(
        this.selectedProductId,
        productData,
        this.imageFile ?? undefined
      )
      .subscribe({
        next: () => {
          alert('Product updated successfully');
          this.resetFormState();
          this.isEditMode = false;
          this.loadProducts();
        },
        error: (err) => {
          console.error('Update failed', err);
          alert('Failed to update product');
        },
      });
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            alert(response.message);
            this.loadProducts();
          } else {
            alert('Error: ' + response.error);
          }
        },
        error: (err) => {
          console.error('Error deleting product', err);
        },
      });
    }
  }

  getImageUrl(product_id: number): string {
    return this.productService.getImageUrl(product_id);
  }

  resetFormState() {
    this.product = {
      name: '',
      price: '',
      category: '',
      quantity: '',
      description: '',
      gstType: '',
      gstRate: '',
    };
    this.imageFile = null;
    this.selectedProductId = null;

    // Clear file input field in DOM
    if (this.fileInputRef) {
      this.fileInputRef.nativeElement.value = '';
    }
  }

  onFileSelected(file: File | undefined) {
    if (file) {
      this.imageFile = file;
    }
  }
  editProduct(product: any) {
    this.isEditMode = true;
    this.selectedProductId = product.product_id;
    this.product = {
      name: product.productName,
      price: product.product_price,
      category: product.product_category,
      quantity: product.product_available_stock_quantity,
      description: product.product_description,
      gstType: product.gst_type,
      gstRate: product.gst_rate,
    };
  }
}

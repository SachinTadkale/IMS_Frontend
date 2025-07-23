import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Seller } from '../../../model/seller/seller';

@Component({
  selector: 'app-seller-vendor-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seller-vendor-modal.component.html',
  styleUrl: './seller-vendor-modal.component.css',
})
export class SellerVendorModalComponent {
  @Input() show = false;
  @Input() isEditMode = false;

  // Strongly type the seller input
  seller: Seller = {
    id: '', // Optional: if you're using id in edit mode
    name: '',
    email: '',
    grossSale: 0,
    earning: 0,
    imagePath: ''
  };

  imageFile: File | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Seller>();
  @Output() fileSelected = new EventEmitter<File>();

  @Output() formSubmitted = new EventEmitter<FormData>();

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }

  Close() {
    this.close.emit();
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', this.seller.name);
    formData.append('email',this.seller.email);
    if(this.seller.grossSale){
    formData.append('grossSale', this.seller.grossSale.toString());
    }
    if(this.seller.earning){
    formData.append('earning', this.seller.earning.toString());
    }
    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }
    this.formSubmitted.emit(formData);
  
  }

}

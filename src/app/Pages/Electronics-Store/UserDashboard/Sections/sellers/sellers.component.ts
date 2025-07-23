import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Seller } from '../../../../../model/seller/seller';
import { SellerService } from '../../../../../Services/Sellers/seller.service';
import { SellerVendorModalComponent } from '../../../../../Components/Modal/seller-vendor-modal/seller-vendor-modal.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-sellers',
  standalone: true,
  imports: [FormsModule, CommonModule, SellerVendorModalComponent],
  templateUrl: './sellers.component.html',
  styleUrl: './sellers.component.css',
})
export class SellersComponent implements OnInit {
  sellers: Seller[] = [];
  searchTerm: string = '';
  searchField: string = 'name';
  editingIndex: number | null = null;
  showModal: boolean = false;

  newSeller: Seller = {
    name: '',
    id: '',
    email: '',
    grossSale: null,
    earning: null,
    imagePath: '',
  };

  constructor(
    private sellerService: SellerService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.fetchSeller();
  }

  fetchSeller() {
    this.sellerService.getSellers().subscribe({
      next: (resp: any) => {
        this.sellers = resp;
        console.log('Fetched Sellers:', resp);
      },
      error: (er) => {
        console.log('Error while getting seller ', er);
      },
    });
  }

  get filteredSellers() {
    if (!this.searchTerm.trim()) return this.sellers;

    return this.sellers.filter((seller) => {
      const value = seller[this.searchField as keyof Seller];
      if (typeof value === 'number') {
        return value.toString().includes(this.searchTerm);
      }
      if (typeof value === 'string') {
        return value.toLowerCase().includes(this.searchTerm.toLowerCase());
      }
      return false;
    });
  }

  openAddSellerModal(): void {
    this.newSeller = {
      name: '',
      id: '',
      email: '',
      grossSale: null,
      earning: null,
      imagePath: '',
    };
    this.editingIndex = null;
    this.showModal = true;
  }

  editSeller(index: number) {
    const seller = this.filteredSellers[index];
    const realIndex = this.sellers.indexOf(seller);
    this.newSeller = { ...seller };
    this.editingIndex = realIndex;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  handleFileInput(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.newSeller.imagePath = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  deleteSeller(index: number): void {
    const seller = this.filteredSellers[index];
    const realIndex = this.sellers.indexOf(seller);

    if (confirm('Are you sure you want to delete this seller?')) {
      this.sellerService.deleteSeller(seller.id).subscribe(
        () => {
          this.sellers.splice(realIndex, 1);
          alert('Seller deleted successfully!');
        },
        (error) => {
          console.error('Error deleting seller:', error);
          alert('Failed to delete seller.');
        }
      );
    }
  }

  handleSave(formData:FormData): void {
    if (this.editingIndex !== null) {
     
    } else {
      this.sellerService.uploadFormData(formData).subscribe({
        next: (resp) => {

          alert("Seller saved ! "+resp);

        },
        error: (er) => {
          console.log("Error while saveing seller", er);
        }
      });
    }
  }

  // ✅ Bypass Angular's image sanitizer
  getSanitizedImage(imagePath: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imagePath);
  }
}

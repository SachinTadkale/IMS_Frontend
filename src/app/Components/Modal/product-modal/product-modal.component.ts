import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css'
})
export class ProductModalComponent {
 @Input() show = false;
  @Input() product: any = {
    name: '',
    price: '',
    category: '',
    quantity: '',
    description: '',
    gstType: '',
    gstRate: ''
  };
  @Input() isEditMode = false;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() fileSelected = new EventEmitter<File>();

  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  categories: string[] = ['Smartphone', 'Laptop & PC', 'Refrigerator', 'Washing Machine', 'AC'];

  Close() {
    this.close.emit();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.save.emit();
  }


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileSelected.emit(input.files[0]);
    }
  }
}

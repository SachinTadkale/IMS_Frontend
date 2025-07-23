import { Injectable } from '@angular/core';

export interface CartItem {
  id: number;
  imgurl: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  netAmount:number;
  gstType: string;
  gstRate: number;
  gstAmount: number;
  totalAmount: number;
}

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {

  
  cartItems: any[] = [];

  addToCart(item: any) {
    this.cartItems.push(item);
  }

  getItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
  }

  removeFromCart(id: number): void {
    const index = this.cartItems.findIndex(item => item.id === id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

}

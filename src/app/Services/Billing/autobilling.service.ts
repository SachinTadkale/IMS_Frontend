import { Injectable } from '@angular/core';
import { CartItem } from '../AddToCartService/add-to-cart-service.service';

@Injectable({
  providedIn: 'root'
})
export class AutobillingService {

  private billingItems: CartItem[] = [];

  setBillingItem(items: CartItem[]) {
    this.billingItems = items;
  }

  getBillingItem(): CartItem[] {
    return this.billingItems;
  }
}

import { Component, OnInit } from '@angular/core';
import { ElectronicsNavComponent } from "../../../Components/navbar/store-navbars/electronics-nav/electronics-nav.component";
import { CommonModule } from '@angular/common';
import { AddToCartService ,CartItem} from '../../../Services/AddToCartService/add-to-cart-service.service';
import { FormsModule } from '@angular/forms';
import { SalesProductService } from '../../../Services/Billing/sales-product.service';
import { AutobillingService } from '../../../Services/Billing/autobilling.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cart',
  standalone: true,
  imports: [ElectronicsNavComponent,CommonModule,FormsModule],
  templateUrl: './my-cart.component.html',
  styleUrl: './my-cart.component.css'
})
export class MyCartComponent implements OnInit{
  items: CartItem[] = [];


  total: number = 0;

  constructor(private cartService: AddToCartService, private billService: SalesProductService, private billingItem: AutobillingService, private router: Router) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.updateTotal();
  }

  getImageUrl() { }

  updateTotal(): void {
    this.items = this.items.map(item => {
      const netAmount = item.price * item.quantity;
      const gstAmount = netAmount * item.gstRate / 100;
      const totalAmount = netAmount + gstAmount;

      return {
        ...item,
        netAmount,
        gstAmount,
        totalAmount
      };
    });

    this.total = this.items.reduce((sum, item) => sum + item.totalAmount, 0);

    // Optional: update items in cart service too
    this.cartService.cartItems = this.items;
  }



  removeItem(id: number): void {
    this.cartService.removeFromCart(id);
    this.items = this.cartService.getItems();

    // Recalculate item amounts after removal
    this.items = this.items.map(item => {
      const netAmount = item.price * item.quantity;
      const gstAmount = netAmount * item.gstRate / 100;
      const totalAmount = netAmount + gstAmount;

      return {
        ...item,
        netAmount,
        gstAmount,
        totalAmount
      };
    });

    // Update the total using new totalAmount values
    this.total = this.items.reduce((sum, item) => sum + item.totalAmount, 0);
  }


  clearCart(): void {
    this.cartService.clearCart();
    this.items = [];
    this.total = 0;
  }

  exicuteBill() {
    const processedItems = this.cartService.cartItems.map(item => {
      const netAmount = item.price * item.quantity;
      const gstAmount = netAmount * item.gstRate / 100;
      const totalAmount = netAmount + gstAmount;

      return {
        ...item,
        netAmount,
        gstAmount,
        totalAmount
      };
    });

    // Now you can use this array to send to a service or log it
    console.log("Billing Items:", processedItems);
    // Send processed items to billing
    this.billingItem.setBillingItem(processedItems);
    alert('Bill send to dashboard then go to dashboard ');
    this.navigateToAutoBilling();
    this.clearCart();
  }

  navigateToAutoBilling() {
   

  this.router.navigate(['/electronics-user-dashboard']).then(() => {
    setTimeout(() => {
      this.router.navigate([
        { outlets: { outlet2: ['electronics-autoBilling'] } },
      ]);
    }, 100); // S
  });
  
  }

}

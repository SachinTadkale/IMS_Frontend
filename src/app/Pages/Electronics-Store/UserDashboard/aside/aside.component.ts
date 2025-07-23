import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [NgClass],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css',
})
export class AsideComponent {
  activeItem: string = 'Dashboard'; // Stores the active menu item

  constructor(private router: Router) {}

  onItemClick(item: string): void {
    switch (item) {
      case 'Dashboard':
        this.router.navigate([
          { outlets: { outlet2: ['electronics-user-dashboard-home'] } },
        ]);
        this.activeItem = item;
        break;

      case 'Products':
        this.router.navigate([
          { outlets: { outlet2: ['electronics-user-dashboard-product'] } },
        ]);
        this.activeItem = item;
        break;

      case 'Categories':
        this.router.navigate([
          { outlets: { outlet2: ['electronics-user-dashboard-category'] } },
        ]);
        this.activeItem = item;
        break;

      // case 'Orders':
      //   this.activeItem = item;
      //   break;

      // Billing is handled via dropdown, so no navigation here
      case 'Billing':
        this.activeItem = item;
        break;

      case 'Sellers':
         this.router.navigate([
          { outlets: { outlet2: ['sellers'] } },
        ]);
        this.activeItem = item;
        break;

      case 'Reviews':
        this.router.navigate([
          { outlets: { outlet2: ['electronics-user-dashboard-review'] } },
        ]);
        this.activeItem = item;
        break;

      default:
        console.log('Unknown menu item clicked.');
    }
  }

  onBillingChange(value: string): void {
    this.activeItem = 'Billing';
    switch (value) {
      case 'auto-billing':
        this.router.navigate([{ outlets: { outlet2: ['electronics-user-dashboard-auto-billing'] } }]);

        break;

      case 'manual-billing':
       this.router.navigate([
          { outlets: { outlet2: ['electronics-user-dashboard-manual-billing'] } }]);
       
        break;

      case 'show-bills':
        this.router.navigate([{ outlets: { outlet2: ['electronics-user-dashboard-show-bills'] } }]);
       
        break;

      default:
        console.warn('Unknown billing option selected.');
    }
  }
}

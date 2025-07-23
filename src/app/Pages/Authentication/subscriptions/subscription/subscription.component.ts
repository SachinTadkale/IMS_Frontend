import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../../Services/AdminService/admin-service.service';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css',
})
export class SubscriptionComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.loadGooglePayScript()
      .then(() => {
        this.loadGooglePayButton();
      })
      .catch((err) => {
        console.error('Failed to load Google Pay script:', err);
      });
  }

  fetchUserData() {
    this.adminService.getUserById().subscribe({
      next: (userData) => {
        console.log('User Data:', userData);
        // You can use userData to display in your component
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      },
    });
  }

  // Load Google Pay script dynamically

  loadGooglePayScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.getElementById('google-pay-script')) {
        resolve(); // already loaded
        return;
      }
      const script = document.createElement('script');
      script.id = 'google-pay-script';
      script.src = 'https://pay.google.com/gp/p/js/pay.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Google Pay script load error'));
      document.head.appendChild(script);
    });
  }

  loadGooglePayButton() {
    // Now 'google' should be defined
    const paymentsClient = new (
      window as any
    ).google.payments.api.PaymentsClient({ environment: 'TEST' });
    const paymentDataRequest = this.getPaymentDataRequest();

    const button = paymentsClient.createButton({
      onClick: () =>
        this.onGooglePayButtonClicked(paymentsClient, paymentDataRequest),
    });

    const buttonContainer = document.getElementById('googlePayButton');
    if (buttonContainer) {
      buttonContainer.innerHTML = ''; // clear previous button if any
      buttonContainer.appendChild(button);
    }
  }

  getPaymentDataRequest() {
    return {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['VISA', 'MASTERCARD'],
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'example', // replace with real one in production
              gatewayMerchantId: 'exampleMerchantId',
            },
          },
        },
      ],
      merchantInfo: {
        merchantId: '12345678901234567890', // optional in TEST
        merchantName: 'Example Merchant',
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPrice: '3999.00',
        currencyCode: 'INR',
        countryCode: 'IN',
      },
    };
  }

  onGooglePayButtonClicked(paymentsClient: any, paymentDataRequest: any) {
    paymentsClient
      .loadPaymentData(paymentDataRequest)
      .then((paymentData: any) => {
        console.log('PaymentData:', paymentData);
        const token = paymentData.paymentMethodData.tokenizationData.token;
        this.sendPaymentTokenToBackend(token);
      })
      .catch((err: any) => {
        console.error('Google Pay error', err);
      });
  }

  // Helper to build headers with token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  sendPaymentTokenToBackend(token: string) {
    // Replace with your backend endpoint
    this.http
      .post(
        'http://localhost:8080/api/payments/process',
        { token },
        { headers: this.getAuthHeaders(), responseType: 'text' }
      )
      .subscribe({
        next: (res) => {
          console.log('Payment processed:', res);
          alert('Payment Successful!');
          this.router.navigate(['/login']);
        },
        error: (err) => console.error('Payment error:', err),
      });
  }
}

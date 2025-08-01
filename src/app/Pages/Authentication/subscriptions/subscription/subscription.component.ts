import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubPlan } from '../../../../model/Subscriptions/sub-plan';
import { Router } from '@angular/router';
import { LogoutService } from '../../../../Services/LogoutService/logout.service';
import { AuthenticationService } from '../../../../Services/AuthenticationService/authentication.service';
import { UserData } from '../../../../model/User-Data';
import { PaymentService } from '../../../../Services/PaymentService/payment.service';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css',
})
export class SubscriptionComponent implements OnInit{

  
  selectedFile: File | null = null;
  message:String ='';

   user: UserData = {
      id: 0,
      full_name: '',
      email: '',
      store_type: '',
      password: '',
      paymentStatus:false,
      status: '',
      role: ''
    };

  selectedPlan:SubPlan={
    title:'',
    price:0,
    description:''
  }

   subscriptions= [
    {
      title: 'Free Trial',
      price: 0,
      description: 'Try all premium features for 7 days.'
    },
    {
      title: 'Monthly Subscription',
      price: 299,
      description: 'Full access billed monthly.'
    },
    {
      title: '6-Month Subscription',
      price: 1799,
      description: 'Save 20% with semi-annual billing.'
    },
    {
      title: 'Yearly Subscription',
      price: 2999,
      description: 'Best value! Save over 30%.'
    }
  ];

 

  isPlanSelected:boolean = false;
  isPaymentDone:boolean= false;


utr='';
  qrUrl?: string;

constructor(private http:HttpClient, private router:Router, private logoutService:LogoutService, private authenticationService:AuthenticationService, private paymentService:PaymentService){}



  ngOnInit(): void {

    this.fetchUser();
     
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length) {
      this.selectedFile = event.target.files[0];
    }
  }

  submitPayment() {
    console.log("submiPayment function is called");
    console.log(this.selectedPlan.price);
    console.log(this.utr);
    if(this.selectedFile){
      console.log("file is selected");
    }
    console.log(this.selectedPlan.title);
    console.log(this.selectedPlan.description);

    if (this.selectedPlan.price && this.utr && this.selectedFile) {
      this.paymentService.createPayment(this.selectedPlan.title, this.selectedPlan.price,this.selectedPlan.description, this.utr, this.selectedFile)
        .subscribe({
          next: (response: any) => {
            this.message = response.message || 'Payment created successfully!';
            alert(this.message);
            this.isPaymentDone=true;
          this.fetchUser();
          },
          error: (error) => {
            console.error(error);
            this.message = 'Error creating payment';
            console.log(this.message);
          }
        });
    } else {
      this.message = 'Please fill all fields and select a screenshot.';
      alert(this.message);
    }
  }

  fetchUser() {
    console.log("fetchUser called !");
      this.authenticationService.getUserById().subscribe({
        next: (respUser: UserData) => {
          this.user = respUser;
         if(respUser.paymentStatus){
          this.isPaymentDone=true;
       
         }

        },
        error: (error) => {
          console.error("Error while fetching user", error);
          // Optionally handle error or redirect
        }
      });
    }
  

  selectPlan(plan: any) {
    this.selectedPlan.title = plan.title;
    this.selectedPlan.price = plan.price;
    this.selectedPlan.description = plan.description;

    this.isPlanSelected = true;

     if (this.selectedPlan.price) {
      this.qrUrl = `http://localhost:8080/api/payment/generateQR?amount=${this.selectedPlan.price}`;
    }

  
  }

  createPayment() {
  if (this.utr) {
    if (this.selectedPlan.price && this.utr) {

      // Get token from local storage
      const userKey = localStorage.getItem('imsToken');
      let token = null;
     
      token = userKey;

      if (!token) {
        alert("User is not authenticated. Please login again.");
        return;
      }

      // Build headers with Authorization
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      this.http.post<any>(
        `http://localhost:8080/api/payment/create?amount=${this.selectedPlan.price}&transactionId=${this.utr}`,
        {},
        { headers }
      )
      .subscribe({
        next: (res) =>{
          alert(res.message);
          this.isPaymentDone=true;
          this.fetchUser();
        },
        error: (er) => {}
      });
    }
  } else {
    alert("Insert UTR");
  }
}


cancelPayment(){

  this.utr='';

  this.isPlanSelected = false;
  
}

  logOut(){
     
   this.logoutService.logout();
    
  }
  

}

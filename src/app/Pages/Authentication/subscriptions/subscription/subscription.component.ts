import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubPlan } from '../../../../model/Subscriptions/sub-plan';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css',
})
export class SubscriptionComponent implements OnInit{

  selectedPlan:SubPlan={
    title:'',
    price:'',
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


utr='';
  qrUrl?: string;

constructor(private http:HttpClient, private router:Router){}



  ngOnInit(): void {
     
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
    if(this.utr){
    if (this.selectedPlan.price && this.utr) {
      this.http.post<any>(`http://localhost:8080/api/payment/create?amount=${this.selectedPlan.price}&transactionId=${this.utr}`, {})
        .subscribe(data => {
          alert("Payment details saved need some time to verify");
        });
    }

  }
  else{
    alert("Insert UTR");
  }
}


cancelPayment(){

  this.utr='';

  this.isPlanSelected = false;
  
}

  logOut(){
      sessionStorage.removeItem('token');
      // Redirect to login page
      this.router.navigate(['/public-landing']);
   
    
  }
  

}

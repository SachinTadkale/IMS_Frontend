import { Routes } from '@angular/router';
import { MyCartComponent } from './Pages/Electronics-Store/my-cart/my-cart.component';
import { AutomateBillingComponent } from './Pages/Electronics-Store/UserDashboard/Sections/billing/automate-billing/automate-billing.component';
import { ShowBillsComponent } from './Pages/Electronics-Store/UserDashboard/Sections/billing/show-bills/show-bills.component';
import { ElectronicsStoreHomeComponent } from './Pages/Electronics-Store/electronics-store-home/electronics-store-home.component';
import { UserdashboardComponent } from './Pages/Electronics-Store/UserDashboard/userdashboard/userdashboard.component';
import { LandingFooterComponent } from './Components/footer/landing-footer/landing-footer.component';
import { OtpComponent } from './Pages/Authentication/otp/otp.component';
import { UserProfileComponent } from './Pages/user-profile/user-profile.component';
import { SellersComponent } from './Pages/Electronics-Store/UserDashboard/Sections/sellers/sellers.component';
import { SubscriptionComponent } from './Pages/Authentication/subscriptions/subscription/subscription.component';
import { CentralLandingComponent } from './Pages/CentralLanding/central-landing/central-landing.component';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { ForgotpassComponent } from './Pages/Authentication/forgotpass/forgotpass.component';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./Pages/landing-page/landing-page.component').then(
        (m) => m.LandingPageComponent
      );
    },
  },{
    path: 'public-landing', component: LandingPageComponent
  },
  {
    path: 'landing',
    component: LandingFooterComponent,
  },

  // <--------------------- User Auth Routes --------------------->

  {
    path: 'signup/:storeType',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./Pages/Authentication/sign-up/sign-up.component').then(
        (m) => m.SignUpComponent
      );
    },
  },
  {
    path: 'signup',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./Pages/Authentication/sign-up/sign-up.component').then(
        (m) => m.SignUpComponent
      );
    },
  },
  {
    path: 'verifyEmail',
    loadComponent:()=>{
      return import('./Pages/Authentication/otp/otp.component').then(
        (m)=>m.OtpComponent
      )
    },
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./Pages/Authentication/login/login.component').then(
        (m) => m.LoginComponent
      );
    },
  },
  {
    path:'forgot-password',
    pathMatch:'full',
    loadComponent:()=>{
      return import('./Pages/Authentication/forgot-password/forgot-password.component').then(
        (m)=>m.ForgotPasswordComponent
      )
    }
  },
  // <--------------------- Profile Routee --------------------->

  { path: 'userProfile', component: UserProfileComponent },

  // <--------------------- Admin Routes --------------------->

  {
    path: 'adminLogin',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/admin/admin-auth/admin-login/admin-login.component'
      ).then((m) => m.AdminLoginComponent);
    },
  },
{
  path: 'reset-password/:role',
  loadComponent: () =>
    import('./Pages/admin/admin-auth/reset-password/reset-password.component').then(
      m => m.ResetPasswordComponent
    )
},


{
  path: 'adminSignup',
  loadComponent: () =>
    import('./Pages/admin/admin-auth/admin-signup/admin-signup.component').then(
      (m) => m.AdminSignupComponent
    )
},
  {
    path: 'adminDashboard',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/admin/admin-dashboard/admin-dashboard.component'
      ).then((m) => m.AdminDashboardComponent);
    },
  },

  // <--------------------- Electronics Store Routes --------------------->

  {
    path: 'electronics-store-home',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/Electronics-Store/electronics-store-home/electronics-store-home.component'
      ).then((m) => m.ElectronicsStoreHomeComponent);
    },
  },
  {
    path: 'electronics-store-see-more',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/Electronics-Store/electronics-store-home/electronics-see-more/electronics-see-more.component'
      ).then((m) => m.ElectronicsSeeMoreComponent);
    },
  },
  // <--------------------- Electronics Store Dashboard Routes --------------------->
  {
    path: 'electronics-user-dashboard',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/Electronics-Store/UserDashboard/userdashboard/userdashboard.component'
      ).then((m) => m.UserdashboardComponent);
    },
  },
  {
    path: 'electronics-user-dashboard-home',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/Electronics-Store/UserDashboard/Sections/home/home.component'
      ).then((m) => m.HomeComponent);
    },
    outlet: 'outlet2',
  },
  {
    path: 'electronics-myCart',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./Pages/Electronics-Store/my-cart/my-cart.component').then(
        (m) => m.MyCartComponent
      );
    },
  },
  {
    path: 'electronics-showBilling',
    loadComponent: () => {
      return import(
        './Pages/Electronics-Store/UserDashboard/Sections/billing/show-bills/show-bills.component'
      ).then((m) => m.ShowBillsComponent);
    },
    outlet: 'outlet2',
  },
  {
    path: 'electronics-autoBilling',
    loadComponent: () => {
      return import(
        './Pages/Electronics-Store/UserDashboard/Sections/billing/automate-billing/automate-billing.component'
      ).then((m) => m.AutomateBillingComponent);
    },
    outlet: 'outlet2',
  },
  {
    path: 'sellers',
    loadComponent: () => {
      return import(
        './Pages/Electronics-Store/UserDashboard/Sections/sellers/sellers.component'
      ).then((m) => m.SellersComponent);
    },
    outlet: 'outlet2',
    // This route is for the Sellers section in the Electronics Store User Dashboard
  },
  {
    path: 'subscription',
    pathMatch:'full',
    loadComponent:()=>{
      return import('./Pages/Authentication/subscriptions/subscription/subscription.component').then(
        (m)=>m.SubscriptionComponent
      )
    }
  },
  {
    path: 'electronics-user-dashboard-product',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/Electronics-Store/UserDashboard/Sections/product/product.component'
      ).then((m) => m.ProductComponent);
    },
    outlet: 'outlet2',
  },
  {
    path: 'electronics-user-dashboard-category',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/Electronics-Store/UserDashboard/Sections/category/category.component'
      ).then((m) => m.CategoryComponent);
    },
    outlet: 'outlet2',
  },
  {
    path: 'electronics-user-dashboard-review',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/Electronics-Store/UserDashboard/Sections/review/review.component'
      ).then((m) => m.ReviewComponent);
    },
    outlet: 'outlet2',
  },
  {
    path: 'electronics-user-dashboard-auto-billing',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/Electronics-Store/UserDashboard/Sections/billing/automate-billing/automate-billing.component'
      ).then((m) => m.AutomateBillingComponent);
    },
    outlet: 'outlet2',
  },
  {
    path: 'electronics-user-dashboard-manual-billing',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/Electronics-Store/UserDashboard/Sections/billing/manual-billing/manual-billing.component'
      ).then((m) => m.ManualBillingComponent);
    },
    outlet: 'outlet2',
  },
  {
    path: 'electronics-user-dashboard-show-bills',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/Electronics-Store/UserDashboard/Sections/billing/show-bills/show-bills.component'
      ).then((m) => m.ShowBillsComponent);
    },
    outlet: 'outlet2',
  },
  {
    path: 'electronics-user-dashboard-sellers',
    pathMatch: 'full',
    loadComponent: () => {
      return import(
        './Pages/Electronics-Store/UserDashboard/Sections/sellers/sellers.component'
      ).then((m) => m.SellersComponent);
    },
    outlet: 'outlet2',
  },
  
  {
    path: 'central-landing',
    loadComponent:()=>{
      return import('./Pages/CentralLanding/central-landing/central-landing.component').then(
        (m)=>m.CentralLandingComponent
      )
    }
  },
  {
    path:'forgetPass', component:ForgotpassComponent
  }
  // <--------------------- Grocery Store Routes --------------------->

  // <--------------------- Industrial Store Routes --------------------->

  // <--------------------- Grocery Store Dashboard Routes --------------------->
];

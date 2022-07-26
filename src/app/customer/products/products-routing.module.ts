import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductComponent } from './all-product/all-product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DetailsComponent } from './details/details.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {path: '',redirectTo:'products/all-products', pathMatch: 'full'},
  {path: 'products/all-products', component:AllProductComponent},
  {path: 'products/details/:id', component:DetailsComponent},
  {path: 'products/cart', component:CartComponent},
  {path: 'products/checkout', component:CheckoutComponent},
  {path: 'products/checkout/payment', component:PaymentComponent},
  // {path:'verify-email', component: VerifyComponent },
  // {path: 'auth/register', component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

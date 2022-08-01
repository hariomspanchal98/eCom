import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductComponent } from './all-product/all-product.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {path: '',redirectTo:'products/all-products', pathMatch: 'full'},
  {path: 'products/all-products', component:AllProductComponent},
  {path: 'products/details/:id', component:DetailsComponent}
  // {path:'verify-email', component: VerifyComponent },
  // {path: 'auth/register', component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

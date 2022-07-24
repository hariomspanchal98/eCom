import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { CreateproductComponent } from './createproduct/createproduct.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { TrialComponent } from './trial/trial.component';

const routes: Routes = [
  {path:'allproducts', component:AllproductsComponent},
  {path:'createproduct', component:CreateproductComponent},
  {path:'trial', component:TrialComponent},
  {path:'productdetails', component: ProductdetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateComponent } from '../users/update/update.component';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { CreateproductComponent } from './createproduct/createproduct.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';

const routes: Routes = [
  {path:'allproducts', component:AllproductsComponent},
  {path:'createproduct', component:CreateproductComponent},
  {path:'productdetails/:id', component: ProductdetailsComponent},
  {path: 'updateproduct/:id', component: UpdateproductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

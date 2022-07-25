import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { NavbarModule } from '../navbar/navbar.module';
import { CreateproductComponent } from './createproduct/createproduct.component';
import { ReactiveFormsModule } from '@angular/forms';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { TrialComponent } from './trial/trial.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';

@NgModule({
  declarations: [
    AllproductsComponent,
    CreateproductComponent,
    TrialComponent,
    ProductdetailsComponent,
    UpdateproductComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NavbarModule,
    ReactiveFormsModule,
    IvyCarouselModule,
    MdbCarouselModule,
  ]
})
export class ProductsModule { }

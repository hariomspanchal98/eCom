import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { NavbarModule } from '../navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { AllProductComponent } from './all-product/all-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { DetailsComponent } from './details/details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  declarations: [
    AllProductComponent,
    DetailsComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NavbarModule,
    ReactiveFormsModule,
    IvyCarouselModule,
    MdbCarouselModule,
    MatPaginatorModule,
    FormsModule
  ]
})
export class ProductsModule { }

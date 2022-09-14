import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { NavbarModule } from '../navbar/navbar.module';
import { CreateproductComponent } from './createproduct/createproduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { QuillModule } from 'ngx-quill';
import { NgDompurifyModule } from '@tinkoff/ng-dompurify';

@NgModule({
  declarations: [
    AllproductsComponent,
    CreateproductComponent,
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
    MatPaginatorModule,
    FormsModule,
    NgxDropzoneModule,
    QuillModule.forRoot(),
    NgDompurifyModule,
  ]
})
export class ProductsModule { }

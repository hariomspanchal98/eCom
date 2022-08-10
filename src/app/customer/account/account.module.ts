import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { NavbarModule } from '../navbar/navbar.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    NavbarModule,
    ReactiveFormsModule,
    ImageCropperModule
  ]
})
export class AccountModule { }

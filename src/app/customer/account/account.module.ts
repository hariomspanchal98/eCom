import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { NavbarModule } from '../navbar/navbar.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    NavbarModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }

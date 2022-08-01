import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { NavbarModule } from '../navbar/navbar.module';
import { AvatarModule } from 'ngx-avatar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    NavbarModule,
    AvatarModule
  ]
})
export class UserModule { }

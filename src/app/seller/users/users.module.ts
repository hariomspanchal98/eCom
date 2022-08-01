import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './list/list.component';
import { NavbarModule } from '../navbar/navbar.module';
import { DetailsComponent } from './details/details.component';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SearchfilterPipe } from '../../searchfilter.pipe';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent,
    UpdateComponent,
    CreateComponent,
    SearchfilterPipe
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NavbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    AvatarModule
  ]
})
export class UsersModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {path: '', redirectTo:'auth/login', pathMatch: 'full'},
  {path:'list', component:ListComponent},
  {path: 'details/:id',component: DetailsComponent},
  {path:'update/:id', component:UpdateComponent},
  {path: 'create', component:CreateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

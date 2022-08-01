import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: '', redirectTo:'auth/login', pathMatch: 'full'},
  {path: 'profile', component:ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  {path: '',redirectTo:'auth/login', pathMatch: 'full'},
  {path: 'auth/login', component:LoginComponent},
  {path:'auth/verify-email', component: VerifyComponent },
  {path:'auth/reset-password', component: ResetComponent },
  {path: 'auth/register', component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

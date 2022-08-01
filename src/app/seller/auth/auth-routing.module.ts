import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  {path: '',redirectTo:'auth/login', pathMatch: 'full'},
  {path: 'auth/login', component:LoginComponent},
  {path:'verify-email', component: VerifyComponent },
  {path: 'auth/register', component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

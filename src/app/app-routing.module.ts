import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './auth/register/register.component';
import { VerifyComponent } from './auth/verify/verify.component';

const routes: Routes = [
  // {path: '',redirectTo:'auth', pathMatch: 'full'},
  {path: '', loadChildren : () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path:'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  {path:'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
  {path:'products', loadChildren:() => import('./products/products.module').then(m => m.ProductsModule)},
  {path: '**', redirectTo:'', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {path: '', loadChildren : () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path:'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  {path:'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) , canActivate:[AuthGuard]},
  {path:'products', loadChildren:() => import('./products/products.module').then(m => m.ProductsModule), canActivate:[AuthGuard]},
  {path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }

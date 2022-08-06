import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren : () => import('./products/products.module').then(m => m.ProductsModule)},
  // {path:'', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  {path:'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  // {path:'products', loadChildren:() => import('./products/products.module').then(m => m.ProductsModule)},
  // {path: '**', redirectTo:'', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

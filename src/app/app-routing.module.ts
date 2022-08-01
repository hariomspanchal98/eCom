import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {path: '',redirectTo:'seller', pathMatch: 'full'},
  // {path: '', loadChildren : () => import('./seller/seller.module').then(m => m.SellerModule)},
  {path:'seller', loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule) },
  // {path:'users', loadChildren: () => import('./seller/users/users.module').then(m => m.UsersModule)},
  // {path:'products', loadChildren:() => import('./seller/products/products.module').then(m => m.ProductsModule)},
  {path: '**', redirectTo:'seller', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

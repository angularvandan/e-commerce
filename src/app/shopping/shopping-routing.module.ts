import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path:'',redirectTo:'products/product-list',pathMatch:'full'},
  {path:'products',component:ProductsComponent, loadChildren:()=>import('../shopping/products/products.module').then(module=>module.ProductsModule)},
  {path:'auth',loadChildren:()=>import('../shopping/auth/auth.module').then(module=>module.AuthModule)},
  {path:'customer',loadChildren:()=>import('../shopping/customer/customer.module').then(module=>module.CustomerModule)},
  {path:'order',loadChildren:()=>import('../shopping/order/order.module').then(module=>module.OrderModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }

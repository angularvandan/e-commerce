import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path:'',redirectTo:'auth',pathMatch:'full'},
  { path: 'auth', component: AuthComponent, loadChildren: () => import("./auth/auth.module").then(module => module.AuthModule) },
  { path: 'product', loadChildren: () => import("./product/product.module").then(module => module.ProductModule) },
  { path: 'setting',loadChildren: () => import("./setting/setting.module").then(module => module.SettingModule) },
  { path: 'order',loadChildren: () => import("./order/order.module").then(module => module.OrderModule) },
  { path:'**',redirectTo:'auth',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }

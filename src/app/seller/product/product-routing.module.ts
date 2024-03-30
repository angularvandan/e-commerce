import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { AuthGuardGuard } from '../guard/auth-guard.guard';
import { ProductListComponent } from './product-list/product-list.component';
import { ViewProductComponent } from './view-product/view-product.component';

const routes: Routes = [
  {path:'',canActivate:[AuthGuardGuard],children:[
    {path:'',redirectTo:'product-list',pathMatch:'full'},
    {path:'product-list',component:ProductListComponent},
    {path:'create-products',component:CreateProductComponent},
    {path:'view-product',component:ViewProductComponent},
    {path:'**',redirectTo:'product-list',pathMatch:'full'}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

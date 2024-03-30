import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProductComponent } from './view-product/view-product.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {path:'',redirectTo:'product-list',pathMatch:'full'},
  {path:'product-list',component:ProductListComponent},
  {path:'view-product',component:ViewProductComponent},
  {path:'**',redirectTo:'product-list',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrderComponent } from './create-order/create-order.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { CartComponent } from './cart/cart.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

const routes: Routes = [
  {path:'',redirectTo:'create-order',pathMatch:'full'},
  {path:'create-order',component:CreateOrderComponent},
  {path:'confirm-order',component:ConfirmOrderComponent},
  {path:'cart',component:CartComponent},
  {path:'order-details',component:OrderDetailsComponent},
  {path:'order-history',component:OrderHistoryComponent},
  {path:'**',redirectTo:'create-order',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }

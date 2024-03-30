import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { CreateOrderComponent } from './create-order/create-order.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { ORDER_STATE_NAME } from './state/order.selector';
import { orderReducer } from './state/order.reducer';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CreateOrderComponent,
    ConfirmOrderComponent,
    CartComponent,
    OrderHistoryComponent,
    OrderDetailsComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    SharedModule,
    StoreModule.forFeature(ORDER_STATE_NAME,orderReducer)
  ]
})
export class OrderModule { }

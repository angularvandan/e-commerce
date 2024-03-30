import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailsComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    NgxPaginationModule,
    FormsModule,
    SharedModule
  ]
})
export class OrderModule { }

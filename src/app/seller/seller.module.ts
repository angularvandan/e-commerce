import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    SellerComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    SellerRoutingModule
  ],
})
export class SellerModule { }

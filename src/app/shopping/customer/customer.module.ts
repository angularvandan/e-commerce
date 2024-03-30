import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RemoveAccountComponent } from './remove-account/remove-account.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { UpdateAddressComponent } from './update-address/update-address.component';
import { GetAddressComponent } from './get-address/get-address.component';
import { SelfComponent } from './self/self.component';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [
    ChangePasswordComponent,
    RemoveAccountComponent,
    AddAddressComponent,
    UpdateAddressComponent,
    GetAddressComponent,
    SelfComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    ImageCropperModule
  ]
})
export class CustomerModule { }

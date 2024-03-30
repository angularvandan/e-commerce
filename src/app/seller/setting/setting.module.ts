import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { CompanyComponent } from './company/company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { UserlistComponent } from './user-list/userlist.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyProfileComponentComponent } from './my-profile/my-profile-component.component';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    CompanyComponent,
    UserComponent,
    UserlistComponent,
    ChangePasswordComponent,
    MyProfileComponentComponent,
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule

  ]
})
export class SettingModule { 
}

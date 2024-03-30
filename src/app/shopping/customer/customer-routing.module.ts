import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelfComponent } from './self/self.component';
import { GuardGuard } from '../guard/guard.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RemoveAccountComponent } from './remove-account/remove-account.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { UpdateAddressComponent } from './update-address/update-address.component';
import { GetAddressComponent } from './get-address/get-address.component';

const routes: Routes = [
  {path:'',canActivate:[GuardGuard],children:[
    {path:'',redirectTo:'profile',pathMatch:'full'},
    {path:'profile',component:SelfComponent},
    {path:'change-password',component:ChangePasswordComponent},
    {path:'remove-account',component:RemoveAccountComponent},
    {path:'add-address',component:AddAddressComponent},
    {path:'update-address',component:UpdateAddressComponent},
    {path:'get-address',component:GetAddressComponent},
    {path:'**',redirectTo:'profile',pathMatch:'full'},

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

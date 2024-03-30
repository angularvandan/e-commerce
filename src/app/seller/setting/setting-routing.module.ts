import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { UserComponent } from './user/user.component';
import { UserlistComponent } from './user-list/userlist.component';
import { AuthGuardGuard } from '../guard/auth-guard.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyProfileComponentComponent } from './my-profile/my-profile-component.component';

const routes: Routes = [
  {path:'',canActivate:[AuthGuardGuard],children:[
    {path:'company',component:CompanyComponent},
    {path:'create-user',component:UserComponent},
    {path:'user-list',component:UserlistComponent},
    {path:'change-password',component:ChangePasswordComponent},
    {path:'my-profile',component:MyProfileComponentComponent},
    {path:'',redirectTo:'my-profile',pathMatch:'full'}

  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {
 }

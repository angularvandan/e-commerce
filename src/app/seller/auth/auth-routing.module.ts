import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponentComponent } from './register/registration-component.component';
import { LoginComponentComponent } from './login/login-component.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailVerifyComponent } from './email-verify/email-verify.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'register',component:RegistrationComponentComponent},
  {path:'login',component:LoginComponentComponent},
  {path:'reset-password',component:ResetPasswordComponent},
  {path:'verify-email',component:EmailVerifyComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
  
}

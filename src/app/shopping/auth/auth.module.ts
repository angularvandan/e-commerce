import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import environment from 'src/environment/environment';
import { CaptchaService } from '../service/captcha.service';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  providers:[
    ReCaptchaV3Service,
    CaptchaService,
    { provide: RECAPTCHA_V3_SITE_KEY, useValue:environment.reCaptchaKey },
  ]
})
export class AuthModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponentComponent } from './login/login-component.component';
import { RegistrationComponentComponent } from './register/registration-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import environment from 'src/environment/environment';
import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig } from 'angularx-social-login';
import { CaptchaService } from '../service/captcha.service';

@NgModule({
  declarations: [
    LoginComponentComponent,
    RegistrationComponentComponent,
    AuthComponent,
    ResetPasswordComponent,
    EmailVerifyComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    ReCaptchaV3Service,
    CaptchaService,
    SocialAuthService,
    { provide: RECAPTCHA_V3_SITE_KEY, useValue:environment.reCaptchaKey },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.clientId
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
})
export class AuthModule {
  constructor(){
    console.log('Auth Module Loaded');
  }
 }

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EmailVerifyComponent } from './email-verify.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig } from 'angularx-social-login';
import { CaptchaService } from '../../service/captcha.service';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReCaptchaV3Service, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import environment from 'src/environment/environment';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

describe('EmailVerifyComponent', () => {
  let component: EmailVerifyComponent;
  let fixture: ComponentFixture<EmailVerifyComponent>;
  let httpMock:HttpTestingController;
  let captchaService:CaptchaService;
  let httpService:HttpService;
  let userService:UserService;
  let socialAuthService:SocialAuthService;
  let router:Router;
  let activatedRoute: ActivatedRoute;


  let myRouter = {
    navigate: jasmine.createSpy('navigate')
  }
  const mockActivatedRoute = { 
    queryParamMap: of({token:'sdfsd'}) 
  };
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailVerifyComponent ],
      imports: [ToastrModule.forRoot(),RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule,CommonModule],
      providers:[EmailVerifyComponent,HttpService,UserService,CaptchaService
        ,ReCaptchaV3Service,SocialAuthService,
        { provide: Router, useValue: myRouter },
        { provide: RECAPTCHA_V3_SITE_KEY, useValue:environment.reCaptchaKey },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
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
        }],    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(EmailVerifyComponent);
    httpMock = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService);
    httpService = TestBed.inject(HttpService);
    captchaService = TestBed.inject(CaptchaService);
    socialAuthService = TestBed.inject(SocialAuthService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    component = TestBed.inject(EmailVerifyComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // component.token='';
    // expect(myRouter.navigate).toHaveBeenCalledWith(['auth/login'])
  });

  it('should be getTokenFromUrl',fakeAsync(()=>{
    component.getTokenFromUrl();
    tick(1000);
  }));
  
  it('should be on verify account', () => {
    spyOn(httpService,'verifyAccount').and.returnValues(of({token:'sdfs'}));
    component.onVerifyAccount();
    expect(httpService.verifyAccount).toHaveBeenCalled();
  });
  it('should be on verify account error', () => {
    spyOn(httpService,'verifyAccount').and.returnValues(throwError({error:{message:'Invalid user'}}));
    component.onVerifyAccount();
    expect(httpService.verifyAccount).toHaveBeenCalled();
  });

});

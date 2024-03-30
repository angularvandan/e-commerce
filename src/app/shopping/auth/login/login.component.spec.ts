import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoginComponent } from './login.component';
import { HttpService } from '../../service/http.service';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig } from 'angularx-social-login';
import { CaptchaService } from '../../service/captcha.service';
import { UserService } from '../../service/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReCaptchaV3Service, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import environment from 'src/environment/environment';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock:HttpTestingController;
  let captchaService:CaptchaService;
  let httpService:HttpService;
  let userService:UserService;
  let socialAuthService:SocialAuthService;
  let router:Router;

  let myRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers:[LoginComponent,HttpService,UserService,CaptchaService
        ,ReCaptchaV3Service,SocialAuthService,
        { provide: Router, useValue: myRouter },
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
        }],
        imports:[ToastrModule.forRoot(),HttpClientTestingModule,FormsModule,ReactiveFormsModule,BrowserAnimationsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    httpMock = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService);
    httpService = TestBed.inject(HttpService);
    captchaService = TestBed.inject(CaptchaService);
    socialAuthService = TestBed.inject(SocialAuthService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    component=TestBed.inject(LoginComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
    spyOn(userService, 'getSelf').and.returnValue(Promise.resolve(true));
    TestBed.createComponent(LoginComponent);
    expect(userService.getSelf).toHaveBeenCalled();
  });
  it('should on login',()=>{
    spyOn(httpService,'login').and.returnValues(of({email:'vand@gmail.com',password:'sds',captcha:'sdfs'}));
    component.onLogin();
    expect(httpService.login).toHaveBeenCalled();
  });
  it('should on login',()=>{
    spyOn(httpService,'login').and.returnValues(throwError({error:{message:'invalid user'}}));
    component.onLogin();
    expect(httpService.login).toHaveBeenCalled();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ResetPasswordComponent } from './reset-password.component';
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
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { RegistrationComponentComponent } from '../register/registration-component.component';
import { CommonModule } from '@angular/common';


describe('ResetPasswordComponent', () => {

  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let httpMock: HttpTestingController;
  let captchaService: CaptchaService;
  let httpService: HttpService;
  let userService: UserService;
  let socialAuthService: SocialAuthService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  let myRouter = {
    navigate: jasmine.createSpy('navigate')
  }
  const mockActivatedRoute = { 
    queryParams: of({ abc: 'sfsdf' }) 
  };
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [ToastrModule.forRoot(),RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule,CommonModule],
      providers: [ResetPasswordComponent, HttpService, UserService, CaptchaService
        , ReCaptchaV3Service, SocialAuthService,
        { provide: Router, useValue: myRouter },
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.reCaptchaKey },
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
                provider: new GoogleLoginProvider(environment.clientId)
              },
            ],
            onError: (err) => {
              console.error(err);
            }
          } as SocialAuthServiceConfig,
        }],
    }).compileComponents();
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeEach(() => {

    fixture = TestBed.createComponent(ResetPasswordComponent);
    httpMock = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService);
    httpService = TestBed.inject(HttpService);
    captchaService = TestBed.inject(CaptchaService);
    socialAuthService = TestBed.inject(SocialAuthService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    component = TestBed.inject(ResetPasswordComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);


    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should on reset  success',()=>{
    spyOn(httpService,'resetPassword').and.returnValue(of({password:'sdfs',token:'sdsf'}));
    component.onReset();
    expect(httpService.resetPassword).toHaveBeenCalled();
  });
  it('should on reset  fail',()=>{
    spyOn(httpService,'resetPassword').and.returnValue(throwError({error:{message:'Invalid user'}}));
    component.onReset();
    expect(httpService.resetPassword).toHaveBeenCalled();
  })
});

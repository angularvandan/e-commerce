import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { HttpService } from '../../service/http.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { ReCaptchaV3Service, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import environment from 'src/environment/environment';
import { CaptchaService } from '../../service/captcha.service';
import { UserService } from '../../service/user.service';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let httpService:HttpService;
  let httpClient:HttpClient;
  let httpMock:HttpTestingController;
  let captchaService:CaptchaService;
  let userService:UserService;
  let socialAuthService:SocialAuthService;
  let router:Router;

  let myRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers:[RegisterComponent,HttpService,UserService,CaptchaService
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

    })
    .compileComponents();
  });
  beforeEach(async ()=>{
    httpService=TestBed.inject(HttpService);
    httpClient=TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService);
    captchaService = TestBed.inject(CaptchaService);
    socialAuthService = TestBed.inject(SocialAuthService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    component=TestBed.inject(RegisterComponent);


    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
    spyOn(userService, 'getSelf').and.returnValue(Promise.resolve(true));
    TestBed.createComponent(RegisterComponent);
    expect(userService.getSelf).toHaveBeenCalled();
  });
  it('should on register',()=>{
    
    spyOn(httpService,'register').and.returnValues(of({name:'sdss',email:'vanda@gmail.com',password:'sdfs',captcha:'sdf'}));
    component.onRegister();
    expect(httpService.register).toHaveBeenCalled();
  });
  it('should on register eroor',()=>{
    spyOn(httpService,'register').and.returnValues(throwError({error:{message:'invalid user'}}));
    component.onRegister();
    expect(httpService.register).toHaveBeenCalled();
  });
});

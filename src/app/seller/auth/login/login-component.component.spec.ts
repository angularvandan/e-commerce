import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { LoginComponentComponent } from './login-component.component';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { CaptchaService } from '../../service/captcha.service';
import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig, SocialUser } from 'angularx-social-login';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import { Router } from '@angular/router';
import environment from 'src/environment/environment';
import { ToastrModule } from 'ngx-toastr';
import { of, throwError } from 'rxjs';


describe('LoginComponentComponent', () => {
  let component: LoginComponentComponent;
  let fixture: ComponentFixture<LoginComponentComponent>;
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
      declarations: [ LoginComponentComponent ],
      providers:[LoginComponentComponent,HttpService,UserService,CaptchaService
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

  beforeEach(() => {
    
    fixture = TestBed.createComponent(LoginComponentComponent);
    
    httpMock = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService);
    httpService = TestBed.inject(HttpService);
    captchaService = TestBed.inject(CaptchaService);
    socialAuthService = TestBed.inject(SocialAuthService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    component=TestBed.inject(LoginComponentComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(myRouter.navigate).toHaveBeenCalledWith(['setting/my-profile'])
  });
  it('should local storage',()=>{
    let getItemSpy: jasmine.Spy;
    getItemSpy = spyOn(localStorage, 'getItem');
    const expectedValue = JSON.stringify('test data');
    getItemSpy.and.returnValue(expectedValue);
    
    TestBed.createComponent(LoginComponentComponent);

    expect(getItemSpy).toHaveBeenCalledWith('token1');
  })

  it('should NgOnInit execute captcha service',()=>{
    spyOn(component,'executeCaptchaService');
    component.ngOnInit();
    expect(component.executeCaptchaService).toHaveBeenCalled();
  })
  it('execute captcha service', async ()=>{
    await component.executeCaptchaService().then((value:any)=>{
      expect(component.captcha).toBeDefined()
    })
  });
  it('should be submit success',()=>{
    spyOn(component,'executeCaptchaService');
    spyOn(httpService,'createLogin').and.returnValue(of({password:'sds',email:'sdfs',captcha:'sdfs'}));
    component.onSubmit();
    
    expect(component.executeCaptchaService).toHaveBeenCalled();
    expect(httpService.createLogin).toHaveBeenCalled();
       
  })
  it('should be submit fail',()=>{
    spyOn(component,'executeCaptchaService');
    spyOn(httpService,'createLogin').and.returnValue(throwError({error:{message:'Invalid user'}}));
    component.onSubmit();
    
    expect(component.executeCaptchaService).toHaveBeenCalled();
    expect(httpService.createLogin).toHaveBeenCalled();
  });
  it('should google sign in', fakeAsync(() => {
    // Arrange
    const executeCaptchaServiceSpy = spyOn(component, 'executeCaptchaService');
    const signInSpy = spyOn(socialAuthService, 'signIn').and.returnValues(Promise.resolve(new SocialUser()));
    spyOn(httpService, 'googleSignIn').and.returnValue(of({ idToken:'sdfsd',captcha:'sdfsd'}));

    // Act
    component.onGoogleSignIn();
    tick();

    // Assert
    expect(executeCaptchaServiceSpy).toHaveBeenCalled();
    expect(signInSpy).toHaveBeenCalledWith(GoogleLoginProvider.PROVIDER_ID);
    expect(httpService.googleSignIn).toHaveBeenCalled();

    expect(myRouter.navigate).toHaveBeenCalledWith(['setting/my-profile'])
    flush();

  }));
  it('should be forget',()=>{
    spyOn(component,'executeCaptchaService');
    spyOn(httpService,'forgotPassword').and.returnValue(of({email:'dsdfs',captcha:'sdfs'}));
    component.onForgot();
    
    expect(component.executeCaptchaService).toHaveBeenCalled();
    expect(httpService.forgotPassword).toHaveBeenCalled();
    
  });
  it('should be forget error',()=>{
    spyOn(component,'executeCaptchaService');
    spyOn(httpService,'forgotPassword').and.returnValue(throwError({error:{message:'Invalid user'}}));
    component.onForgot();
    
    expect(component.executeCaptchaService).toHaveBeenCalled();
    expect(httpService.forgotPassword).toHaveBeenCalled();
  });



});

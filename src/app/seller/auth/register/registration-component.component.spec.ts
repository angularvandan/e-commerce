import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponentComponent } from './registration-component.component';
import { UserService } from '../../service/user.service';
import { HttpService } from '../../service/http.service';
import { CaptchaService } from '../../service/captcha.service';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import environment from 'src/environment/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig } from 'angularx-social-login';
import { ToastrModule } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

describe('RegistrationComponentComponent', () => {
  let component: RegistrationComponentComponent;
  let fixture: ComponentFixture<RegistrationComponentComponent>;
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
      declarations: [ RegistrationComponentComponent ],
      imports:[ToastrModule.forRoot(),HttpClientTestingModule,FormsModule,ReactiveFormsModule,BrowserAnimationsModule],
      providers:[RegistrationComponentComponent,UserService,HttpService,SocialAuthService,
      CaptchaService,ReCaptchaV3Service,
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
      }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponentComponent);
    
    httpMock = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService);
    httpService = TestBed.inject(HttpService);
    captchaService = TestBed.inject(CaptchaService);
    socialAuthService = TestBed.inject(SocialAuthService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    component=TestBed.inject(RegistrationComponentComponent)

    // const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should local storage',()=>{
    let getItemSpy: jasmine.Spy;
    getItemSpy = spyOn(localStorage, 'getItem');
    const expectedValue = JSON.stringify('test data');
    getItemSpy.and.returnValue(expectedValue);
    
    TestBed.createComponent(RegistrationComponentComponent);
    expect(myRouter.navigate).toHaveBeenCalledWith(['setting/my-profile'])
    expect(getItemSpy).toHaveBeenCalledWith('token1');

  });
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
  it('should on submit',()=>{
    spyOn(component,'executeCaptchaService');
    let payLoad={
      email:'vandan@gmail.com',
      password:'sdfsf',
      name:'vandan',
      company:'angular',
      captcha:'sdfsfds'
    }
    spyOn(httpService,'createRegister').and.returnValue(of(payLoad))
    component.onSubmit();
    expect(component.executeCaptchaService).toHaveBeenCalled();
    expect(httpService.createRegister).toHaveBeenCalled();
  });
  it('should be submit fail',()=>{
    spyOn(component,'executeCaptchaService');
    spyOn(httpService,'createRegister').and.returnValue(throwError({error:{message:'Invalid user'}}));
    component.onSubmit();
    expect(component.executeCaptchaService).toHaveBeenCalled();
    expect(httpService.createRegister).toHaveBeenCalled();
  });
});

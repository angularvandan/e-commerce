import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { GetAddressComponent } from './get-address.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig } from 'angularx-social-login';
import { CaptchaService } from '../../service/captcha.service';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { ReCaptchaV3Service, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import environment from 'src/environment/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2';

describe('GetAddressComponent', () => {
  let component: GetAddressComponent;
  let fixture: ComponentFixture<GetAddressComponent>;
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
      declarations: [ GetAddressComponent ],
      providers:[GetAddressComponent,HttpService,UserService,CaptchaService
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
    component=TestBed.inject(GetAddressComponent);

    fixture = TestBed.createComponent(GetAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get address',()=>{
    spyOn(httpService,'getSavedAddress').and.callFake(()=>{
      return of({
        'result':'dsdfs'
      });
    });
    component.getAddress();
    expect(httpService.getSavedAddress).toHaveBeenCalled();
  });

  it('should get address error',()=>{
    spyOn(httpService,'getSavedAddress').and.returnValues(throwError({error:{message:'error occurred'}}));
    component.getAddress();
    expect(httpService.getSavedAddress).toHaveBeenCalled();
  });

  it('should update address',()=>{
    component.onUpdateAddress('sdfsd');
    expect(myRouter.navigate).toHaveBeenCalledWith(['shop/customer/update-address'],Object({ queryParams: Object({ id: 'sdfsd' }) }))
  });
  xit('should be onDeleteAddress',()=>{
    let id='sdsdfsdfs'
    component.onDeleteAddress('sdsd');
    spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve({ isConfirmed: true } as SweetAlertResult<any>)
    );
    spyOn(httpService,'deleteAddress').and.returnValues(of({}));
    component.onDeleteAddress('sddfgdfs');
    expect(httpService.deleteAddress).toHaveBeenCalled();
  });

  it('should delete address when confirmed', fakeAsync(() => {
    const addressId = 123;
    const response = { success: true };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));
    const getAddressSpy = spyOn(component, 'getAddress');

    spyOn(httpService,'deleteAddress').and.returnValues(of(response));
    component.onDeleteAddress(addressId);
    tick();
    expect(httpService.deleteAddress).toHaveBeenCalledWith(addressId);
    expect(getAddressSpy).toHaveBeenCalled();
    expect(swalFireSpy).toHaveBeenCalledWith('Deleted!', 'Your file has been deleted.', 'success');
  }));
  
  it('should show error message when deletion fails', fakeAsync(() => {

    const addressId = 123;
    const error = { error: { message: 'Deletion failed' } };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));

    spyOn(httpService,'deleteAddress').and.returnValues(throwError(error));

    component.onDeleteAddress(addressId);
    tick();
    expect(httpService.deleteAddress).toHaveBeenCalledWith(addressId);
    expect(swalFireSpy).toHaveBeenCalledWith('Deletion failed');
  }));

});

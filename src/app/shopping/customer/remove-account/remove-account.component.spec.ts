import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { RemoveAccountComponent } from './remove-account.component';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2';

describe('RemoveAccountComponent', () => {
  let component: RemoveAccountComponent;
  let fixture: ComponentFixture<RemoveAccountComponent>;
  let httpService:HttpService;
  let userService:UserService;
  let httpClient:HttpClient;
  let router:Router;
  let myRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveAccountComponent ],
      providers:[HttpService,UserService,HttpClient,RemoveAccountComponent,
      { provide: Router, useValue: myRouter },
    ],
      imports:[HttpClientModule,ToastrModule.forRoot()]
    })
    .compileComponents();
  });
  beforeEach(async ()=>{
    httpService=TestBed.inject(HttpService);
    userService=TestBed.inject(UserService);
    httpClient=TestBed.inject(HttpClient);
    component=TestBed.inject(RemoveAccountComponent);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;


    fixture = TestBed.createComponent(RemoveAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should delete address when confirmed', fakeAsync(() => {
    const response = { success: true };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));

    spyOn(httpService,'removeAccount').and.returnValues(of(response));
    component.removeAccount();
    tick();
    expect(httpService.removeAccount).toHaveBeenCalled();
    expect(swalFireSpy).toHaveBeenCalledWith('Deleted!', 'Your file has been deleted.', 'success');
  }));

  it('should not confirm then nevigate',fakeAsync(()=>{
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: false }as SweetAlertResult<any>));

    spyOn(httpService,'removeAccount');
    component.removeAccount();
    tick();
    expect(myRouter.navigate).toHaveBeenCalledWith(['shop/customer/profile'])

  }));

  it('should delete address when error', fakeAsync(() => {
    const error = { error: { message: 'Deletion failed' } };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));

    spyOn(httpService,'removeAccount').and.returnValues(throwError(error));
    component.removeAccount();
    tick();
    expect(httpService.removeAccount).toHaveBeenCalled();
    expect(swalFireSpy).toHaveBeenCalledWith('Deletion failed');
    flush();
  }));
});

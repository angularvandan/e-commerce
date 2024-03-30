import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { OrderDetailsComponent } from './order-details.component';
import { UserService } from '../../service/user.service';
import { HttpService } from '../../service/http.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import Swal, { SweetAlertResult } from 'sweetalert2';

describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;
  let userService:UserService;
  let httpService:HttpService;
  let activatedRoute:ActivatedRoute;

  let myRouter = {
    navigate: jasmine.createSpy('navigate')
  }
  const mockActivatedRoute = { 
    queryParamMap: of({token:'sdfsd'}) 
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailsComponent ],
      providers:[UserService,HttpService,OrderDetailsComponent,
        { provide: Router, useValue: myRouter },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
      ],
      imports: [ToastrModule.forRoot(),RouterTestingModule,SharedModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule,CommonModule],

    })
    .compileComponents();
  });

  beforeEach(()=>{

    userService=TestBed.inject(UserService);
    httpService=TestBed.inject(HttpService);
    component=TestBed.inject(OrderDetailsComponent);

    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be onOrderDetails cancelled',()=>{
    let response=[
      {
        items:'sfds',
        deliveryFee:'2332',
        address:'sfds',
        status:'Cancelled'
      }
    ];
    spyOn(httpService,'orderDetails').and.returnValues(of(response));
    component.onOrderDetails();
    expect(httpService.orderDetails).toHaveBeenCalled();

  });
  it('should be onOrderDetails dispatched',()=>{
    let response=[
      {
        items:'sfds',
        deliveryFee:'2332',
        address:'sfds',
        status:'Dispatched'
      }
    ];
    spyOn(httpService,'orderDetails').and.returnValues(of(response));
    component.onOrderDetails();
    expect(httpService.orderDetails).toHaveBeenCalled();

  });
  it('should be onOrderDetails Delivered',()=>{
    let response=[
      {
        items:'sfds',
        deliveryFee:'2332',
        address:'sfds',
        status:'Delivered'
      }
    ];
    spyOn(httpService,'orderDetails').and.returnValues(of(response));
    component.onOrderDetails();
    expect(httpService.orderDetails).toHaveBeenCalled();

  });
  it('should be onOrderDetails error',()=>{
    let response=[
      {
        items:'sfds',
        deliveryFee:'2332',
        address:'sfds',
        status:'Cancelled'
      }
    ];
    spyOn(httpService,'orderDetails').and.returnValues(throwError({error:{message:'sdfsdf'}}));
    component.onOrderDetails();
    expect(httpService.orderDetails).toHaveBeenCalled();

  });

  it('should be on product image',()=>{
    let product={
      productId:'sdfsd'
    }
    let response={
      images:[
        {url:'sdfs'}
      ]
    }
    component.products.push(product);
    spyOn(httpService,'getProduct').and.returnValues(of(response));
    component.onProductImage();
    expect(httpService.getProduct).toHaveBeenCalled();
  });
  it('should be on product image',()=>{
    let product={
      productId:'sdfsd'
    }
    component.products.push(product);
    spyOn(httpService,'getProduct').and.returnValues(throwError({error:{message:'sdfs'}}));
    component.onProductImage();
    expect(httpService.getProduct).toHaveBeenCalled();
  });
  it('should onCancel confirmed', fakeAsync(() => {
    const response = { success: true };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));

    spyOn(httpService,'orderActions').and.returnValues(of(response));
    component.onCancel();
    tick();
    expect(httpService.orderActions).toHaveBeenCalled();
    // expect(swalFireSpy).toHaveBeenCalledWith('Deleted!', 'Your file has been deleted.', 'success');
  }));
  it('should onCancel confirmed error', fakeAsync(() => {

    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));

    spyOn(httpService,'orderActions').and.returnValues(throwError({error:{message:'sdfs'}}));
    component.onCancel();
    tick();
    expect(httpService.orderActions).toHaveBeenCalled();
    // expect(swalFireSpy).toHaveBeenCalledWith('Deleted!', 'Your file has been deleted.', 'success');
  }));

  it('should be onDispatch',()=>{
    spyOn(httpService,'orderActions').and.returnValues(of('dispatch','sdfs'));
    component.onDispatch();
    expect(httpService.orderActions).toHaveBeenCalled();
  });
  it('should be onDispatch error',()=>{
    spyOn(httpService,'orderActions').and.returnValues(throwError({error:{message:'sdfsd'}}));
    component.onDispatch();
    expect(httpService.orderActions).toHaveBeenCalled();
  });

  it('should be onDelivered',()=>{
    spyOn(httpService,'orderActions').and.returnValues(of('deliver','sdfsd'));
    component.onDelivered();
    expect(httpService.orderActions).toHaveBeenCalled();
  });
  it('should be onDelivered',()=>{
    spyOn(httpService,'orderActions').and.returnValues(throwError({error:{message:'sdfsd'}}));
    component.onDelivered();
    expect(httpService.orderActions).toHaveBeenCalled();
  });

});

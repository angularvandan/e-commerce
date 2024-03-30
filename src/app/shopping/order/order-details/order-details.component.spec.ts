import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { OrderDetailsComponent } from './order-details.component';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxEditorModule } from 'ngx-editor';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import Swal, { SweetAlertResult } from 'sweetalert2';

describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;
  let httpService:HttpService;
  let userService:UserService;
  let activatedRoute:ActivatedRoute;
  let router:Router;
  let myRouter = {
    navigate: jasmine.createSpy('navigate')
  }
  const mockActivatedRoute = { 
    queryParamMap: of({id:'sdfsd'}) 
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailsComponent ],
      providers:[HttpService,UserService,OrderDetailsComponent,
        {
          provide:Router,userValue:myRouter
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
    ],
    imports: [ToastrModule.forRoot(),SharedModule,HttpClientTestingModule,NgxEditorModule,NgxDropzoneModule,
      ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
  });
  beforeEach(()=>{
    httpService=TestBed.inject(HttpService);
    userService=TestBed.inject(UserService);
    component=TestBed.inject(OrderDetailsComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    router=TestBed.inject(Router)


    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be onOrderDetails Confirmed',()=>{
    let response={
      items:['sdfs'],
      deliveryFee:'232',
      status:'Confirmed'
    }
    spyOn(httpService,'orderDetails').and.returnValues(of(response));
    component.onOrderDetails();
    expect(httpService.orderDetails).toHaveBeenCalled();
  });
  it('should be onOrderDetails Cancelled',()=>{
    let response={
      items:['sdfs'],
      deliveryFee:'232',
      status:'Cancelled'
    }
    spyOn(httpService,'orderDetails').and.returnValues(of(response));
    component.onOrderDetails();
    expect(httpService.orderDetails).toHaveBeenCalled();
  })
  it('should be onOrderDetails Pending',()=>{
    let response={
      items:['sdfs'],
      deliveryFee:'232',
      status:'Pending'
    }
    spyOn(httpService,'orderDetails').and.returnValues(of(response));
    component.onOrderDetails();
    expect(httpService.orderDetails).toHaveBeenCalled();
  })
  it('should be onOrderDetails error',()=>{
    spyOn(httpService,'orderDetails').and.returnValues(throwError({error:{message:'error occur'}}));
    component.onOrderDetails();
    expect(httpService.orderDetails).toHaveBeenCalled();
  })
  it('should be onOrderDetails onProductImage',()=>{
    let product={
      productId:'sdfsf'
    }
    let response={
      images:[
        {url:'sdfsf'}
      ]
    }
    component.products.push(product);
    spyOn(httpService,'getProduct').and.returnValues(of(response));
    component.onProductImage();
    expect(httpService.getProduct).toHaveBeenCalled();
  })
  it('should be onOrderDetails onProductImage error',()=>{
    let product={
      productId:'sdfsf'
    }
    component.products.push(product);
    spyOn(httpService,'getProduct').and.returnValues(throwError({error:{message:'sdfsf'}}));
    component.onProductImage();
    expect(httpService.getProduct).toHaveBeenCalled();
  });

  it('should be onConfirmOrder',()=>{
    spyOn(router,'navigate');
    component.onConfirmOrder();
    expect(router.navigate).toHaveBeenCalled()
  });

  it('should be onCancelOrder', fakeAsync(() => {
    const response = { success: true };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));

    spyOn(httpService,'cancelOrder').and.returnValues(of(response));
    spyOn(router,'navigate');

    component.onCancelOrder();
    tick();
    expect(httpService.cancelOrder).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled()

    // expect(swalFireSpy).toHaveBeenCalledWith('Deleted!', 'Your file has been deleted.', 'success');
  }));
  it('should be onCancelOrder error', fakeAsync(() => {
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));

    spyOn(httpService,'cancelOrder').and.returnValues(throwError({error:{message:'throw error'}}));

    component.onCancelOrder();
    tick();
    expect(httpService.cancelOrder).toHaveBeenCalled();
    flush();
    // expect(swalFireSpy).toHaveBeenCalledWith('Deleted!', 'Your file has been deleted.', 'success');
  }));



});

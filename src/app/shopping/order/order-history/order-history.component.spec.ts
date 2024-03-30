import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { OrderHistoryComponent } from './order-history.component';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;
  let httpService:HttpService;
  let userService:UserService;
  let router :Router
  let myRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderHistoryComponent ],
      providers:[HttpService,UserService,OrderHistoryComponent,
        {provide:Router,userValue:myRouter}
      ],
      imports: [ToastrModule.forRoot(),FormsModule,RouterTestingModule,HttpClientTestingModule,NgxPaginationModule],

    })
    .compileComponents();
  });

  beforeEach(()=>{
    userService=TestBed.inject(UserService);
    httpService=TestBed.inject(HttpService);
    component=TestBed.inject(OrderHistoryComponent);
    router=TestBed.inject(Router)
    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be onGetAllOrderHistory',()=>{
    let response={
      results:[
        {createdAt:'sdfs'}
      ],
      totalResults:'2323'
    }
    spyOn(httpService,'orderHistory').and.returnValues(of(response));
    component.onGetAllOrderHistory();
    expect(httpService.orderHistory).toHaveBeenCalled();
  });
  it('should be onGetAllOrderHistory',()=>{
    let response={
      results:[
        {createdAt:'sdfs'}
      ],
      totalResults:'2323'
    }
    spyOn(httpService,'orderHistory').and.returnValues(throwError({error:{message:'error occur'}}));
    component.onGetAllOrderHistory();
    expect(httpService.orderHistory).toHaveBeenCalled();
  });

  it('should be onOrderList on limit',()=>{
    spyOn(component,'onGetAllOrderHistory').and.returnValues();
    component.onLimit();
    expect(component.onGetAllOrderHistory).toHaveBeenCalled();
  });
  it('should be onOrderList on short',()=>{
    spyOn(component,'onGetAllOrderHistory').and.returnValues();
    component.onSortOption();
    expect(component.onGetAllOrderHistory).toHaveBeenCalled();
  });
  it('should be onOrderList pageChanged',()=>{
    spyOn(component,'onGetAllOrderHistory').and.returnValues();
    component.pageChanged(1);
    expect(component.onGetAllOrderHistory).toHaveBeenCalled();
  });
  it('should be onShowProductDetails',fakeAsync(()=>{
    spyOn(router,'navigate');
    let id='sdfsf'
    component.onShowProductDetails(id);
    tick();
    expect(router.navigate).toHaveBeenCalled();
  }));


});

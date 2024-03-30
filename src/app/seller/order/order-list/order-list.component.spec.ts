import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListComponent } from './order-list.component';
import { HttpService } from '../../service/http.service';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;
  let httpService:HttpService;
  let myRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderListComponent ],
      providers:[HttpService,OrderListComponent,
        { provide: Router, useValue: myRouter },
      ],
      imports: [ToastrModule.forRoot(),NgxPaginationModule,RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule,CommonModule],

    })
    .compileComponents();

    httpService=TestBed.inject(HttpService);
    component=TestBed.inject(OrderListComponent);
    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be onOrderList',()=>{
    spyOn(httpService,'orderList').and.returnValues(of({page:'2',limit:'1'}));
    component.onOrderList();
    expect(httpService.orderList).toHaveBeenCalled();
  });
  it('should be onOrderList error',()=>{
    spyOn(httpService,'orderList').and.returnValues(throwError({error:{message:'sdfs'}}));
    component.onOrderList();
    expect(httpService.orderList).toHaveBeenCalled();
  });
  it('should be onOrderList on limit',()=>{
    spyOn(component,'onOrderList').and.returnValues();
    component.onLimit();
    expect(component.onOrderList).toHaveBeenCalled();
  });
  it('should be onOrderList on short',()=>{
    spyOn(component,'onOrderList').and.returnValues();
    component.onSortOption();
    expect(component.onOrderList).toHaveBeenCalled();
  });
  it('should be onOrderList pageChanged',()=>{
    spyOn(component,'onOrderList').and.returnValues();
    component.pageChanged(1);
    expect(component.onOrderList).toHaveBeenCalled();
  });
  it('should be onOrderList onShowProductDetails',()=>{
    component.onShowProductDetails('sdfs');
});


});

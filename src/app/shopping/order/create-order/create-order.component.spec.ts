import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { CreateOrderComponent } from './create-order.component';
import { UserService } from '../../service/user.service';
import { HttpService } from '../../service/http.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReducerManager, Store, StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { OrderState } from '../state/order.state';
import { SharedModule } from 'src/app/shared/shared.module';
import { of, throwError } from 'rxjs';

describe('CreateOrderComponent', () => {
  let component: CreateOrderComponent;
  let fixture: ComponentFixture<CreateOrderComponent>;
  let userService:UserService;
  let httpService:HttpService;
  let router:Router;
  let myRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  let store: MockStore<OrderState>;
  const initialState: any = {
    products: [
      {
        "_id": "62dc3744305fe3040d7f4b31",
        "_org": {
            "_id": "62dc3282305fe3040d7f4b0b",
            "name": "AM",
            "email": "omi@abc.com"
        },
        "name": "First Product",
        "description": "Product validation failed: description: Path `description` is required.",
        "images": [
            {
                "public_id": "training-api/hnzed5leeypidgvduqnk",
                "url": "http://res.cloudinary.com/abs-am/image/upload/v1658599236/training-api/hnzed5leeypidgvduqnk.jpg"
            }
        ],
        "deleted": false,
        "createdAt": "2022-07-23T18:00:36.797Z",
        "updatedAt": "2022-08-24T12:12:43.374Z",
        "price": 7466,
        "count": 1,
        "totalPrice": 7466
    }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrderComponent ],
      providers:[UserService,HttpService,CreateOrderComponent,Store,provideMockStore(initialState),
        { provide: ReducerManager, useValue: {} },
        {provide:Router,useValue:myRouter}
      ],
      imports: [ToastrModule.forRoot(),SharedModule,RouterTestingModule,HttpClientTestingModule,StoreModule.forRoot({})],
    })
    .compileComponents();
  });
  beforeEach(()=>{

    userService=TestBed.inject(UserService);
    httpService=TestBed.inject(HttpService);
    component=TestBed.inject(CreateOrderComponent);
    store = TestBed.inject(Store) as MockStore<any>;


    fixture = TestBed.createComponent(CreateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be ngOnInit',fakeAsync(()=>{
    let products= [
      {
        "_id": "62dc3744305fe3040d7f4b31",
        "_org": {
            "_id": "62dc3282305fe3040d7f4b0b",
            "name": "AM",
            "email": "omi@abc.com"
        },
        "name": "First Product",
        "description": "Product validation failed: description: Path `description` is required.",
        "images": [
            {
                "public_id": "training-api/hnzed5leeypidgvduqnk",
                "url": "http://res.cloudinary.com/abs-am/image/upload/v1658599236/training-api/hnzed5leeypidgvduqnk.jpg"
            }
        ],
        "deleted": false,
        "createdAt": "2022-07-23T18:00:36.797Z",
        "updatedAt": "2022-08-24T12:12:43.374Z",
        "price": 7466,
        "count": 1,
        "totalPrice": 7466
    }
    ]
    spyOn(component['store'], 'select').and.returnValues(of(products));
    spyOn(component['store'], 'dispatch');
    spyOn(httpService,'getSavedAddress').and.returnValues(of({}));
    component.ngOnInit();
    tick();
    expect(httpService.getSavedAddress).toHaveBeenCalled();
  }));
  it('should be getAllProductFromStore',fakeAsync(()=>{
    let products= [
      {
        "_id": "62dc3744305fe3040d7f4b31",
        "_org": {
            "_id": "62dc3282305fe3040d7f4b0b",
            "name": "AM",
            "email": "omi@abc.com"
        },
        "name": "First Product",
        "description": "Product validation failed: description: Path `description` is required.",
        "images": [
            {
                "public_id": "training-api/hnzed5leeypidgvduqnk",
                "url": "http://res.cloudinary.com/abs-am/image/upload/v1658599236/training-api/hnzed5leeypidgvduqnk.jpg"
            }
        ],
        "deleted": false,
        "createdAt": "2022-07-23T18:00:36.797Z",
        "updatedAt": "2022-08-24T12:12:43.374Z",
        "price": 7466,
        "count": 1,
        "totalPrice": 7466
    }
    ]
    spyOn(component['store'], 'select').and.returnValues(of(products));
    spyOn(component['store'], 'dispatch');
    component.getAllProductFromStore();
    tick();
    expect(component['store'].select).toHaveBeenCalled();
  }));

  it('should be getTotalPrice',()=>{
    let product={
      totalPrice:2234,
      count:'2'
    }
    component.products.push(product);
    component.getTotalPrice();
    expect(component.totalPrice).toEqual(product.totalPrice);
  });
  it('should be onRadioAddress',()=>{
    let response={
      street:'sdfsff',
      addressLine2:'sdfsdf',
      city:'sdfsf',
      state:'sdfsf',
      pin:'232342'
    };
    spyOn(httpService,'getAddressById').and.returnValues(of(response));
    component.onRadioAddress('sdsdfs');
    expect(httpService.getAddressById).toHaveBeenCalled();
  });
  it('should be onRadioAddress',()=>{
    spyOn(httpService,'getAddressById').and.returnValues(throwError({error:{message:'sdfsdf'}}));
    component.onRadioAddress('sdsdfs');
    expect(httpService.getAddressById).toHaveBeenCalled();
  })
  it('should be onCreateOrder',fakeAsync(()=>{
    component.addressChecked=true;
    let item={
      _id:'sdfsdf',
      name:'sdffsdf',
      price:3423,
      count:2,
      totalPrice:234
    }
    let items=[];
    items.push(item);

    let response={
      order:{
        _id:'sdfsfd'
      }
    }
    component.products.push(item);
    spyOn(httpService,'createOrder').and.returnValues(of(response));
    component.onCreateOrder();
    tick();
    expect(httpService.createOrder).toHaveBeenCalled();
    flush();
  }));
  it('should be onCreateOrder',fakeAsync(()=>{
    component.addressChecked=true;
    let item={
      _id:'sdfsdf',
      name:'sdffsdf',
      price:3423,
      count:2,
      totalPrice:234
    }
    let items=[];
    items.push(item);
    component.products.push(item);
    spyOn(httpService,'createOrder').and.returnValues(throwError({error:{message:'sdfsfd'}}));
    component.onCreateOrder();
    tick();
    expect(httpService.createOrder).toHaveBeenCalled();
    flush();

  }));
  it('should be onCreateOrder',fakeAsync(()=>{
    component.addressChecked=false;
    component.onCreateOrder();
    tick();
    flush();
  }));

});

import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReducerManager, State, Store, StoreModule } from '@ngrx/store';
import { OrderState } from '../state/order.state';
import { CurrencyFormattingPipe } from 'src/app/pipe/currency-formatting.pipe';
import { of, throwError } from 'rxjs';
import { updateCount } from '../state/order.actions';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let httpService:HttpService;
  let userService:UserService;
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
      declarations: [ CartComponent,CurrencyFormattingPipe ],
      providers:[UserService,HttpService,CartComponent,Store,provideMockStore(initialState),
        { provide: ReducerManager, useValue: {} },
        {provide:Router,useValue:myRouter}
      ],
      imports: [ToastrModule.forRoot(),RouterTestingModule,HttpClientTestingModule,StoreModule.forRoot({})],
    })
    .compileComponents();
  });
  beforeEach(()=>{
    userService=TestBed.inject(UserService);
    httpService=TestBed.inject(HttpService);
    component = TestBed.inject(CartComponent);
    store = TestBed.inject(Store) as MockStore<any>;
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be getAllProductFormStore',fakeAsync(()=>{
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
    component.getAllProductFormStore();
    tick();
    expect(component['store'].select).toHaveBeenCalled();
  }));

  it('should be onSmallImageClick',()=>{
      let image={
        url:'sdfs'
      }
    component.onSmallImageClick(image);
    expect(component.showBigImage).toEqual(image.url);
  });

  it('should be onCheckOut if ',fakeAsync(()=>{
    spyOn(userService,'getSelf').and.returnValues(Promise.resolve(true));
    spyOn(httpService,'getSavedAddress').and.returnValues(of([]));
    component.onCheckout();
    tick();
    expect(userService.getSelf).toHaveBeenCalled();
    expect(httpService.getSavedAddress).toHaveBeenCalled();

  }));
  it('should be onCheckOut else ',fakeAsync(()=>{
    spyOn(userService,'getSelf').and.returnValues(Promise.resolve(true));
    spyOn(httpService,'getSavedAddress').and.returnValues(of(['sdfs']));
    component.onCheckout();
    tick();
    expect(userService.getSelf).toHaveBeenCalled();
    expect(httpService.getSavedAddress).toHaveBeenCalled();

  }));
  it('should be onCheckOut error',fakeAsync(()=>{
    spyOn(userService,'getSelf').and.returnValues(Promise.resolve(true));
    spyOn(httpService,'getSavedAddress').and.returnValues(throwError({error:{message:'sdfsd'}}));
    component.onCheckout();
    tick();
    expect(userService.getSelf).toHaveBeenCalled();
    expect(httpService.getSavedAddress).toHaveBeenCalled();

  }));
  it('should be onCheckOut  catch error ',fakeAsync(()=>{
    spyOn(userService,'getSelf').and.returnValues(Promise.reject(false));
    component.onCheckout();
    tick();
    expect(userService.getSelf).toHaveBeenCalled();
  }));

  it('should be countItem',fakeAsync(()=>{
    let id='123';
    let val=1;
    spyOn(component['store'],'dispatch').and.returnValues();
    spyOn(component,'getAllProductFormStore').and.returnValues();
    component.countItem(id,val);
    tick();
    expect(component.getAllProductFormStore).toHaveBeenCalled();
    expect(component['store'].dispatch).toHaveBeenCalledWith(updateCount({ payload: { id, count: val } }));
    flush();

  }));
  it('should remove item on confirmed', fakeAsync(() => {

    let id = '123';
    spyOn(component['store'], 'dispatch');
    component.onCancel(id);
    tick();
    expect(component['store'].dispatch).toHaveBeenCalled();
    flush();

  }));

});

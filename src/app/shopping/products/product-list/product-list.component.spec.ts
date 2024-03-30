import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let httpService:HttpService;
  let userService:UserService;
  let router:Router;
  let myRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      providers:[HttpService,UserService,ProductListComponent,
      {
        provide:Router,useValue:myRouter
      }
    ],
      imports: [ToastrModule.forRoot(),RouterTestingModule, HttpClientTestingModule,  
        NgxPaginationModule,FormsModule],
    })
    .compileComponents();
  });
  beforeEach(()=>{
    httpService=TestBed.inject(HttpService);
    userService=TestBed.inject(UserService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    component=TestBed.inject(ProductListComponent);


    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should on get all product',()=>{
    spyOn(httpService,'getAllProducts').and.returnValues(of({limit:'1'}));
    component.onGetAllProducts();
    expect(httpService.getAllProducts).toHaveBeenCalled();
  });
  it('should on get all product eroor',()=>{
    spyOn(httpService,'getAllProducts').and.returnValues(throwError({error:{message:'error message'}}));
    component.onGetAllProducts();
    expect(httpService.getAllProducts).toHaveBeenCalled();
  });
  it('should page change',()=>{
    spyOn(component,'onGetAllProducts');
    component.pageChanged(1);
    expect(component.onGetAllProducts).toHaveBeenCalled();
  });
  it('should be on limit',()=>{
    spyOn(component,'onGetAllProducts');
    component.onLimit();
    expect(component.onGetAllProducts).toHaveBeenCalled();
  });
  it('should be on short by if ',()=>{
    component.sortBy = 'sdfsdfs';
    spyOn(component,'onGetAllProducts');
    component.onSortBy();
    expect(component.onGetAllProducts).toHaveBeenCalled();
  });

  it('should be on short by else',()=>{
    component.sortBy='';
    spyOn(component,'onGetAllProducts');
    component.onSortBy();
    expect(component.onGetAllProducts).toHaveBeenCalled();
  });
  it('should be on short by name',()=>{
    component.name='sfsf';
    spyOn(component,'onGetAllProducts');
    component.onSortByName();
    expect(component.onGetAllProducts).toHaveBeenCalled();
  });
  it('should be on short by name else',()=>{
    component.name='';
    spyOn(component,'onGetAllProducts');
    component.onSortByName();
    expect(component.onGetAllProducts).toHaveBeenCalled();
  });
  it('should on view product',()=>{
    let id='dsdf'
    component.onViewProduct(id);
    expect(myRouter.navigate).toHaveBeenCalledWith(['shop/products/view-product'],{queryParams:{id:id}})
  });
  it('should on add cart',()=>{
    let id="dsdfsd";
    spyOn(component,'onGetProduct');
    component.onAddCart(id);
    expect(component.onGetProduct).toHaveBeenCalled();

  });
  it('should on get product',()=>{
    let id="dsdfsd";
    spyOn(httpService,'getProduct').and.returnValues(of({id}));
    component.onGetProduct(id);
    expect(httpService.getProduct).toHaveBeenCalled();
  });
  it('should on get product error ',()=>{
    let id="dsdfsd";
    spyOn(httpService,'getProduct').and.returnValues(throwError({error:{message:'error occur'}}));
    component.onGetProduct(id);
    expect(httpService.getProduct).toHaveBeenCalled();
  });


});

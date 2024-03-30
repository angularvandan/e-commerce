import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxEditorModule } from 'ngx-editor';
import { ToastrModule } from 'ngx-toastr';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let httpService:HttpService;
  let userService:UserService;

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
      imports: [ToastrModule.forRoot(),HttpClientTestingModule,NgxEditorModule,NgxDropzoneModule,
        ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
  });
  beforeEach(()=>{  
    httpService=TestBed.inject(HttpService);
    userService=TestBed.inject(UserService);
    component=TestBed.inject(ProductListComponent);

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should on get all product',()=>{
    spyOn(httpService,'getProducts').and.returnValues(of({limit:'1'}));
    component.onGetProduct();
    expect(httpService.getProducts).toHaveBeenCalled();
  });
  it('should on get all product',()=>{
    spyOn(httpService,'getProducts').and.returnValues(throwError({error:{message:'throw error'}}));
    component.onGetProduct();
    expect(httpService.getProducts).toHaveBeenCalled();
  });
  it('should page change',()=>{
    spyOn(component,'onGetProduct');
    component.onPageChange(1);
    expect(component.onGetProduct).toHaveBeenCalled();
  });
  it('should be on limit',()=>{
    spyOn(component,'onGetProduct');
    component.onLimit();
    expect(component.onGetProduct).toHaveBeenCalled();
  });
  it('should be on short by if ',()=>{
    component.sort = 'sdfsdfs';
    spyOn(component,'onGetProduct');
    component.onSort();
    expect(component.onGetProduct).toHaveBeenCalled();
  });
  it('should be on short by else ',()=>{
    component.sort = '';
    spyOn(component,'onGetProduct');
    component.onSort();
    expect(component.onGetProduct).toHaveBeenCalled();
  });
  it('should be on short by name if',()=>{
    component.name = 'dsdf';
    spyOn(component,'onGetProduct');
    component.onSortByName();
    expect(component.onGetProduct).toHaveBeenCalled();
  });
  it('should be on short by name else',()=>{
    component.name = '';
    spyOn(component,'onGetProduct');
    component.onSortByName();
    expect(component.onGetProduct).toHaveBeenCalled();
  });
  it('should be on update',()=>{
    component.onUpdate({});
    expect(component.onUpdate).toBeDefined();

  });
  it('should be on update product',()=>{
    let productPayload={
      name:'dsdfsf',
      description:'sdfsdf',
      price:'234234',
    }
    spyOn(httpService,'updateProducts').and.returnValues(of(productPayload,'sdfsdf'));
    component.onUpdateProduct({});
    expect(httpService.updateProducts).toHaveBeenCalled();
  });
  it('should be on update product',()=>{
    spyOn(httpService,'updateProducts').and.returnValues(throwError({error:{message:'error occur'}}));
    component.onUpdateProduct({});
    expect(httpService.updateProducts).toHaveBeenCalled();
  });
  it('should on view product',()=>{
    let product={
      _id:'sdfsdf'
    }
    component.onViewProduct(product);
    expect(myRouter.navigate).toHaveBeenCalledWith(['product/view-product'], { queryParams: { id: product._id } })
  });
  it('should delete product when confirmed', fakeAsync(() => {
    const response = { success: true };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));

    spyOn(httpService,'deleteProduct').and.returnValues(of(response));
    component.onDeleteProduct('sdfsf');
    tick();
    expect(httpService.deleteProduct).toHaveBeenCalled();
    expect(swalFireSpy).toHaveBeenCalledWith('Deleted!', 'Your file has been deleted.', 'success');
  }));
  it('should delete address when error', fakeAsync(() => {
    const error = { error: { message: 'Deletion failed' } };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));

    spyOn(httpService,'deleteProduct').and.returnValues(throwError(error));
    component.onDeleteProduct('dfgddf');
    tick();
    expect(httpService.deleteProduct).toHaveBeenCalled();
    expect(swalFireSpy).toHaveBeenCalledWith('Deletion failed');
    flush();
  }));

});



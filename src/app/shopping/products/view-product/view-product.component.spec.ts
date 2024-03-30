import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductComponent } from './view-product.component';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CurrencyFormattingPipe } from 'src/app/pipe/currency-formatting.pipe';

describe('ViewProductComponent', () => {
  let component: ViewProductComponent;
  let fixture: ComponentFixture<ViewProductComponent>;
  let httpService:HttpService;
  let userService:UserService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    // const httpServiceSpy = jasmine.createSpyObj('HttpService', ['getProduct']);

    await TestBed.configureTestingModule({
      declarations: [ ViewProductComponent, CurrencyFormattingPipe ],
      providers:[UserService,HttpService,ViewProductComponent,
        // { provide: HttpService, useValue: httpServiceSpy },
        { provide: ActivatedRoute, useValue: { queryParamMap: of({ get: () => '1' }) } }
      ],
      imports:[HttpClientTestingModule,ToastrModule.forRoot(),SharedModule,RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(()=>{
    httpService = TestBed.inject(HttpService);
    
    userService=TestBed.inject(UserService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    component=TestBed.inject(ViewProductComponent);
    fixture = TestBed.createComponent(ViewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the showBigImage on small image click', () => {
    const image = { url: 'image2.jpg' };
    component.onSmallImageClick(image);

    expect(component.showBigImage).toEqual('image2.jpg');
  });
  
  it('should  on get product ', () => {
    let response={
      images:{
        url:'abcd',
      }
    }
    httpService.getProduct = jasmine.createSpy().and.returnValue(of(response));
    component.onGetProduct();
    expect(httpService.getProduct).toHaveBeenCalled();
  });

  it('should on get product error ', () => {
    httpService.getProduct = jasmine.createSpy().and.returnValue(throwError({error:{message:'not found'}}));
    component.onGetProduct();
    expect(httpService.getProduct).toHaveBeenCalled();
  });
  
  

});

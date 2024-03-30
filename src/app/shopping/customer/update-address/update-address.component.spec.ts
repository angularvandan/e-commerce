import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAddressComponent } from './update-address.component';
import { UserService } from '../../service/user.service';
import { HttpService } from '../../service/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('UpdateAddressComponent', () => {
  let component: UpdateAddressComponent;
  let fixture: ComponentFixture<UpdateAddressComponent>;
  let httpService:HttpService;
  let userService:UserService;
  let router:Router;
  let activatedRoute: ActivatedRoute;
  let myRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAddressComponent ],
      providers:[HttpService,UserService,UpdateAddressComponent,
        { provide: Router, useValue: myRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of({
              get: (param: string) => {
                if (param === 'id') {
                  return '123';
                }
                return null;
              }
            })
          }
        }
      ],
      imports: [ToastrModule.forRoot(),RouterTestingModule, HttpClientTestingModule,
         FormsModule, ReactiveFormsModule, BrowserAnimationsModule,CommonModule,
        ],
    })
    .compileComponents();
  });
  beforeEach(async ()=>{
    userService=TestBed.inject(UserService);
    httpService=TestBed.inject(HttpService);
    component=TestBed.inject(UpdateAddressComponent);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture = TestBed.createComponent(UpdateAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
  });
  it('should get address',()=>{
    spyOn(httpService,'getAddressById').and.returnValues(of({id:'sdfsf'}));
    component.getAddress();
    expect(httpService.getAddressById).toHaveBeenCalled();
  });
  it('should get address error',()=>{
    spyOn(httpService,'getAddressById').and.returnValues(throwError({error:{message:'error occur'}}));
    component.getAddress();
    expect(httpService.getAddressById).toHaveBeenCalled();
  });
  it('should be on update address',()=>{
    const payload={
      street:'bhagwsdf',
      addressLine2:'sdfsdf',
      state:'bihar',
      city:'patna',
      pin:234234
    }
    spyOn(httpService,'updateAddress').and.returnValues(of({payload,id:'sdfsf'}));
    component.onUpdateAddress();
    expect(httpService.updateAddress).toHaveBeenCalled();
  });
  it('should be on update address error',()=>{
    const payload={
      street:'bhagwsdf',
      addressLine2:'sdfsdf',
      state:'bihar',
      city:'patna',
      pin:234234
    }
    spyOn(httpService,'updateAddress').and.returnValues(throwError({error:{message:'error occur'}}));
    component.onUpdateAddress();
    expect(httpService.updateAddress).toHaveBeenCalled();
  });

});

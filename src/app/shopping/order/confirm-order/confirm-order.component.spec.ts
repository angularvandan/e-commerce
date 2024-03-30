import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOrderComponent } from './confirm-order.component';
import { UserService } from '../../service/user.service';
import { HttpService } from '../../service/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxEditorModule } from 'ngx-editor';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { of, throwError } from 'rxjs';

describe('ConfirmOrderComponent', () => {
  let component: ConfirmOrderComponent;
  let fixture: ComponentFixture<ConfirmOrderComponent>;
  let userService:UserService;
  let httpService:HttpService;
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
      declarations: [ ConfirmOrderComponent ],
      providers:[ConfirmOrderComponent,HttpService,UserService,
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
    component=TestBed.inject(ConfirmOrderComponent);
    router=TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);


    fixture = TestBed.createComponent(ConfirmOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be onConfirmOrder',()=>{
    spyOn(httpService,'confirmOrder').and.returnValues(of({},'sdf'));
    spyOn(router,'navigate');
    component.onConfirmOrder();
    expect(httpService.confirmOrder).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
  });
  it('should be onConfirmOrder error',()=>{
    spyOn(httpService,'confirmOrder').and.returnValues(throwError({error:{message:'error occur'}}));
    component.onConfirmOrder();
    expect(httpService.confirmOrder).toHaveBeenCalled();
  });

});

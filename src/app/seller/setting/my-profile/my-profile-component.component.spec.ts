import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileComponentComponent } from './my-profile-component.component';
import { UserService } from '../../service/user.service';
import { HttpService } from '../../service/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxEditorModule } from 'ngx-editor';
import { ToastrModule } from 'ngx-toastr';

describe('MyProfileComponentComponent', () => {
  let component: MyProfileComponentComponent;
  let fixture: ComponentFixture<MyProfileComponentComponent>;
  let userService:UserService;
  let httpService:HttpService;
  let activatedRoute:ActivatedRoute;
  let myRouter = {
    navigate: jasmine.createSpy('navigate')
  }
  const mockActivatedRoute = { 
    queryParamMap: of({id:'sdfsd'}) 
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProfileComponentComponent ],
      providers:[UserService,HttpService,MyProfileComponentComponent,
        {provide:Router,useValue:myRouter},
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
      ],
      imports: [ToastrModule.forRoot(),HttpClientTestingModule,NgxEditorModule,NgxDropzoneModule,
        ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
  });
  beforeEach(()=>{
    httpService=TestBed.inject(HttpService);
    userService=TestBed.inject(UserService);
    component=TestBed.inject(MyProfileComponentComponent);

    fixture = TestBed.createComponent(MyProfileComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be ngOnInit',()=>{
    let response={
    };
    spyOn(httpService,'fetchUserDetails').and.returnValues(of(response));
    component.ngOnInit();
    expect(httpService.fetchUserDetails).toHaveBeenCalled();
  });
  it('should be ngOnInit',()=>{
    spyOn(httpService,'fetchUserDetails').and.returnValues(throwError({error:{message:'error message'}}));
    component.ngOnInit();
    expect(httpService.fetchUserDetails).toHaveBeenCalled();
  });
  it('should be onVerifyEmail',()=>{
    spyOn(httpService,'verifyEmail').and.returnValues(of({}));
    component.onVerifyEmail();
    expect(httpService.verifyEmail).toHaveBeenCalled();
  });
  it('should be onVerifyEmail error',()=>{
    spyOn(httpService,'verifyEmail').and.returnValues(throwError({error:{message:'error message'}}));
    component.onVerifyEmail();
    expect(httpService.verifyEmail).toHaveBeenCalled();
  });

});

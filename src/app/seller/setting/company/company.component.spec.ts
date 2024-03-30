import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyComponent } from './company.component';
import { UserService } from '../../service/user.service';
import { HttpService } from '../../service/http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('CompanyComponent', () => {
  let component: CompanyComponent;
  let fixture: ComponentFixture<CompanyComponent>;
  let userService:UserService;
  let httpService:HttpService;
  let myRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyComponent ],
      providers:[UserService,HttpService,CompanyComponent,
      {provide:Router,useValue:myRouter}
      ],
      imports:[ToastrModule.forRoot(),HttpClientTestingModule,FormsModule,ReactiveFormsModule,BrowserAnimationsModule]
    })
    .compileComponents();
  });
  beforeEach(()=>{
    userService=TestBed.inject(UserService);
    httpService=TestBed.inject(HttpService);
    component=TestBed.inject(CompanyComponent);


    fixture = TestBed.createComponent(CompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be onChangesUserDetails complete',()=>{
    spyOn(httpService,'updateUserCompanyDetails').and.returnValues(of({name:'sdf'}));
    component.onChangesUserDetails();
    expect(httpService.updateUserCompanyDetails).toHaveBeenCalled();
    expect(myRouter.navigate).toHaveBeenCalledWith(['setting/my-profile'])
  });

  it('should be onChangesUserDetails error',()=>{
    spyOn(httpService,'updateUserCompanyDetails').and.returnValues(throwError({error:{message:'sdfsd'}}));
    component.onChangesUserDetails();
    expect(httpService.updateUserCompanyDetails).toHaveBeenCalled();
  })


});

import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import { UserService } from 'src/app/shopping/service/user.service';
import { HttpService } from '../../service/http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let userService:UserService;
  let httpService:HttpService;
  let myRouter = {
    navigate: jasmine.createSpy('navigate')
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordComponent ],
      providers:[ChangePasswordComponent,UserService,HttpService,
      {provide:Router,useValue:myRouter}
      ],
      imports:[ToastrModule.forRoot(),HttpClientTestingModule,FormsModule,ReactiveFormsModule,BrowserAnimationsModule]

    })
    .compileComponents();
  });
  beforeEach(()=>{
    httpService=TestBed.inject(HttpService);
    userService=TestBed.inject(UserService);
    component=TestBed.inject(ChangePasswordComponent);

    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should on change',fakeAsync(()=>{
    let changesData={
      old_password:'fghfghf',
      new_password:'fgdgdfg',
    }
    spyOn(httpService,'changePassword').and.returnValues(of(changesData));
    component.onChange();
    tick(1000);
    expect(myRouter.navigate).toHaveBeenCalledWith(['setting/my-profile']);
    expect(httpService.changePassword).toHaveBeenCalled();
    flush();
  }));
  it('should on change error',()=>{
    spyOn(httpService,'changePassword').and.returnValues(throwError({error:{message:'throw error'}}));
    component.onChange();
    expect(httpService.changePassword).toHaveBeenCalled();
  })
  it('should on show eye1 if',()=>{
    component.eyeStatus1=true;
    component.onShowHideEye1();
    expect(component.eyeStatus1).toBe(false);
  })
  it('should on show eye1 else',()=>{
    component.eyeStatus1=false;
    component.onShowHideEye1();
    expect(component.eyeStatus1).toBe(true);
  })
  it('should on show eye2 if',()=>{
    component.eyeStatus2=true;
    component.onShowHideEye2();
    expect(component.eyeStatus2).toBe(false);
  })
  it('should on show eye2 else',()=>{
    component.eyeStatus2=false;
    component.onShowHideEye2();
    expect(component.eyeStatus2).toBe(true);
  })


});

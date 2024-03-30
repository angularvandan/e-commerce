import { TestBed } from '@angular/core/testing';

import { AuthGuardGuard } from './auth-guard.guard';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('AuthGuardGuard', () => {
  let guard: AuthGuardGuard;
  let userService:UserService;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[UserService,{
        provide:Router,useValue:router
      }],
      imports: [ToastrModule.forRoot(),RouterTestingModule, HttpClientTestingModule,
        BrowserAnimationsModule,CommonModule,
     ],
    });
    guard = TestBed.inject(AuthGuardGuard);
    userService=TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('CanActivate',(done:DoneFn)=>{
    spyOn(userService,'getProfile').and.returnValue(Promise.resolve(true));
    guard.canActivate();
    expect(userService.getProfile).toHaveBeenCalledTimes(1);
    done();
  });

  it('CanActivate Error',(done:DoneFn)=>{
    spyOn(userService,'getProfile').and.returnValue(Promise.reject(false));
    guard.canActivate();
    expect(userService.getProfile).toHaveBeenCalledTimes(1);
    done();
  });


});

import { TestBed } from '@angular/core/testing';

import { GuardGuard } from './guard.guard';
import { UserService } from '../service/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { Router } from '@angular/router';

describe('GuardGuard', () => {
  let guard: GuardGuard;
  let userService:UserService;

  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[UserService, {
        provide:Router, useValue:router
      }],
      imports: [ToastrModule.forRoot(),RouterTestingModule, HttpClientTestingModule,
         BrowserAnimationsModule,CommonModule,
      ],
    });
    guard = TestBed.inject(GuardGuard);
    userService=TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('CanActivate',(done:DoneFn)=>{
    spyOn(userService,'getSelf').and.returnValue(Promise.resolve(true));
    guard.canActivate();
    expect(userService.getSelf).toHaveBeenCalledTimes(1);
    done();
  });

  it('CanActivate Error',(done:DoneFn)=>{
    spyOn(userService,'getSelf').and.returnValue(Promise.reject(false));
    guard.canActivate();
    expect(userService.getSelf).toHaveBeenCalledTimes(1);
    done();
  });

});

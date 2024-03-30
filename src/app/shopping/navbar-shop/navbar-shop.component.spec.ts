import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarShopComponent } from './navbar-shop.component';
import { UserService } from '../service/user.service';
import { HttpService } from '../service/http.service';
import { Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NavbarShopComponent', () => {
  let component: NavbarShopComponent;
  let fixture: ComponentFixture<NavbarShopComponent>;
  let userService:UserService;
  let httpService:HttpService
  let router:Router;
  let myRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarShopComponent ],
      providers:[UserService,HttpService,NavbarShopComponent,
        // { provide: Router, useValue: myRouter },

      ],
      imports: [ToastrModule.forRoot(),RouterTestingModule, HttpClientTestingModule,
        FormsModule, ReactiveFormsModule, BrowserAnimationsModule,CommonModule,
      ],
    })
    .compileComponents();
  });
  beforeEach(()=>{
    httpService=TestBed.inject(HttpService);
    userService=TestBed.inject(UserService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    component=TestBed.inject(NavbarShopComponent);


    fixture = TestBed.createComponent(NavbarShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be on cartCount',()=>{
    component.cartCount();
    expect(component.cartCount).toBeDefined();
  })
  it('should be on logout',()=>{
    component.loginRegisterStatus=false;
    spyOn(router,'navigate');
    component.onLogOut();
    expect(component.onLogOut).toBeDefined();
  });
  it('should be on onDeleteAccount',()=>{
    spyOn(router,'navigate');
    component.onDeleteAccount();
    expect(component.onDeleteAccount).toBeDefined();
  })
});

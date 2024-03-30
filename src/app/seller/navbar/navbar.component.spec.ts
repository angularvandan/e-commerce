import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { UserService } from '../service/user.service';
import { HttpService } from '../service/http.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let userService:UserService;
  let router:Router;
  let myRouter = {
    navigate: jasmine.createSpy('navigate')
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers:[UserService,NavbarComponent,
        {provide:Router,userValue:myRouter}
      ],
      imports: [ToastrModule.forRoot(),RouterTestingModule, HttpClientTestingModule,
        FormsModule, ReactiveFormsModule, BrowserAnimationsModule,CommonModule,
      ],
    })
    .compileComponents();

    userService=TestBed.inject(UserService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    component=TestBed.inject(NavbarComponent);

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be log out',()=>{
    spyOn(router,'navigate');
    component.onLogOut();
    expect(component.onLogOut).toBeDefined();
  });

});

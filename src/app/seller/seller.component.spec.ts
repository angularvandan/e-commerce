import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerComponent } from './seller.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpService } from './service/http.service';
import { UserService } from './service/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxEditorModule } from 'ngx-editor';
import { of } from 'rxjs';

describe('SellerComponent', () => {
  let component: SellerComponent;
  let fixture: ComponentFixture<SellerComponent>;
  let httpService:HttpService;
  let userService:UserService;
  let activatedRoute:ActivatedRoute;
  
  const mockActivatedRoute = { 
    queryParamMap: of({id:'sdfsd'}) 
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerComponent,NavbarComponent ],
      providers:[HttpService,UserService,
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
      ],
      imports: [ToastrModule.forRoot(),RouterModule,HttpClientTestingModule,NgxEditorModule,NgxDropzoneModule,
        ReactiveFormsModule,FormsModule],    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerComponent);
    userService=TestBed.inject(UserService);
    httpService=TestBed.inject(HttpService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

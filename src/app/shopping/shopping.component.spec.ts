import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingComponent } from './shopping.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NavbarShopComponent } from './navbar-shop/navbar-shop.component';
import { ToastrModule } from 'ngx-toastr';
import { UserService } from './service/user.service';
import { HttpService } from './service/http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxEditorModule } from 'ngx-editor';
import { of } from 'rxjs';

describe('ShoppingComponent', () => {
  let component: ShoppingComponent;
  let fixture: ComponentFixture<ShoppingComponent>;
  let userService:UserService;
  let httpService:HttpService;
  let activatedRoute: ActivatedRoute;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingComponent,NavbarShopComponent],
      providers:[HttpService,UserService,
        { provide: ActivatedRoute, useValue: { queryParamMap: of({ get: () => '1' }) } }

      ],
      imports: [ToastrModule.forRoot(),RouterModule,HttpClientTestingModule,NgxEditorModule,NgxDropzoneModule,
        ReactiveFormsModule,FormsModule],    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingComponent);
    userService=TestBed.inject(UserService);
    httpService=TestBed.inject(HttpService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

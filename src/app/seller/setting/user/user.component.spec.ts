import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxEditorModule } from 'ngx-editor';
import { ToastrModule } from 'ngx-toastr';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let httpService:HttpService;
  let userService:UserService;
  let myRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      providers:[UserComponent,HttpService,UserService,
        {provide:Router,useValue:myRouter},
      ],
      imports: [ToastrModule.forRoot(),HttpClientTestingModule,NgxEditorModule,NgxDropzoneModule,
        ReactiveFormsModule,FormsModule],
    })
    .compileComponents();

  });
  beforeEach(()=>{
    httpService=TestBed.inject(HttpService);
    userService=TestBed.inject(UserService);
    component=TestBed.inject(UserComponent);

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be onCreateUser',()=>{
    let payload={
      name:'vandan',
      email:'vandan@gmail.com',
      password:'sdfsfdd',
      role:'admin'
    };
    spyOn(httpService,'createUser').and.returnValues(of(payload));
    component.onCreateUser();
    expect(httpService.createUser).toHaveBeenCalled();
  });
  it('should be onCreateUser eroor',()=>{
    spyOn(httpService,'createUser').and.returnValues(throwError({error:{message:'sdfsdf'}}));
    component.onCreateUser();
    expect(httpService.createUser).toHaveBeenCalled();
  })


});

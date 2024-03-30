import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { UserlistComponent } from './userlist.component';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxEditorModule } from 'ngx-editor';
import { ToastrModule } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Router } from '@angular/router';

describe('UserlistComponent', () => {
  let component: UserlistComponent;
  let fixture: ComponentFixture<UserlistComponent>;
  let httpService:HttpService;
  let userService:UserService;
  let myRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserlistComponent ],
      providers:[UserlistComponent,HttpService,UserService,
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
    component=TestBed.inject(UserlistComponent);

    fixture = TestBed.createComponent(UserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be onGetUsers',()=>{
    let user={
      limit:'1',
      page:'1',
    }
    spyOn(httpService,'getUsers').and.returnValues(of(user));
    component.onGetUsers(user);
    expect(httpService.getUsers).toHaveBeenCalled();
  });
  it('should be onGetUsers error',()=>{
    let user={
      limit:'1',
      page:'1',
    }
    spyOn(httpService,'getUsers').and.returnValues(throwError({error:{message:'throw error'}}));
    component.onGetUsers(user);
    expect(httpService.getUsers).toHaveBeenCalled();
  });
  it('should delete address when confirmed', fakeAsync(() => {
    const response = { success: true };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));

    spyOn(httpService,'getAdminId').and.returnValues(of(response));
    spyOn(httpService,'deleteUser').and.returnValues(of('sdfs'))
    component.onDeleteUser('fdgdfg');
    tick();
    expect(httpService.getAdminId).toHaveBeenCalled();
    expect(httpService.deleteUser).toHaveBeenCalled();
  }));
  it('should not confirm ',fakeAsync(()=>{
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: false }as SweetAlertResult<any>));

    spyOn(httpService,'getAdminId');
    component.onDeleteUser('sdfsd');

    tick();
  }));
  it('should delete address when error', fakeAsync(() => {
    const error = { error: { message: 'Deletion failed' } };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));

    spyOn(httpService,'getAdminId').and.returnValues(throwError(error));
    component.onDeleteUser('fdgdfg');
    tick();
    expect(httpService.getAdminId).toHaveBeenCalled();
    // expect(swalFireSpy).toHaveBeenCalledWith('Deletion failed');
    flush();
  }));
  it('should delete address when confirmed', fakeAsync(() => {
    const response = { success: true };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }as SweetAlertResult<any>));

    spyOn(httpService,'getAdminId').and.returnValues(of(response));
    spyOn(httpService,'deleteUser').and.returnValues(throwError({error:{message:'throw error'}}));
    component.onDeleteUser('fdgdfg');
    tick();
    expect(httpService.getAdminId).toHaveBeenCalled();
    expect(httpService.deleteUser).toHaveBeenCalled();
    flush();
  }));

  it('should be editUser',()=>{
    component.editUser({});
    expect(component.editUser).toBeDefined();
  });
  it('should be editRole',()=>{
    component.editRole({});
    expect(component.editRole).toBeDefined();
  });
  it('should be onChangeSortBy if',()=>{
    component.sortBy='';
    spyOn(component,'onchange');
    component.onChangeSortBy();
    expect(component.onchange).toHaveBeenCalled();
    expect(component.onChangeSortBy).toBeDefined();
  });
  it('should be onChangeSortBy else',()=>{
    component.sortBy='sdfsd';
    spyOn(component,'onchange');
    component.onChangeSortBy();
    expect(component.onchange).toHaveBeenCalled();
    expect(component.onChangeSortBy).toBeDefined();
  });
  it('should be on change record ',()=>{
    spyOn(component,'onchange');
    component.onChangeRecord();
    expect(component.onchange).toHaveBeenCalled();
    expect(component.onChangeRecord).toBeDefined();
  });
  it('should be on change name ',()=>{
    component.name='sdfsd';
    spyOn(component,'onchange');

    component.onChangeName();
    expect(component.onchange).toHaveBeenCalled();
    expect(component.onChangeName).toBeDefined();
  });
  it('should be on onPageChange ',()=>{
    component.name='sdfsd';
    spyOn(component,'onGetUsers');

    component.onPageChange(1);
    expect(component.onGetUsers).toHaveBeenCalled();
    expect(component.onPageChange).toBeDefined();
  });
  it('should on update user',()=>{
    component.specificUser={
      _id:'sdfsdf'
    };
    let specificUser={
      _id:'sdfs'
    }
    component.editRoleStatus=true;
    spyOn(httpService,'updateUserRole').and.returnValues(of(specificUser._id,'user'));
    component.onUpdateUser();
    expect(httpService.updateUserRole).toHaveBeenCalled();
  });
  it('should on update user error',()=>{
    component.specificUser={
      _id:'sdfsdf'
    };
    let specificUser={
      _id:'sdfs'
    }
    component.editRoleStatus=true;
    spyOn(httpService,'updateUserRole').and.returnValues(throwError({error:{message:'sdfsdf'}}));
    component.onUpdateUser();
    expect(httpService.updateUserRole).toHaveBeenCalled();
  });
  it('should on update user else',()=>{
    component.specificUser={
      _id:'sdfsdf'
    };
    let specificUser={
      _id:'sdfs'
    }
    let payload={
      email:'vnadn@gmail.com',
      password:'sdfsdf',
      name:'sdfsdf'
    }
    component.editRoleStatus=false;
    spyOn(httpService,'updateUserDetails').and.returnValues(of(specificUser._id,payload));
    component.onUpdateUser();
    expect(httpService.updateUserDetails).toHaveBeenCalled();
  });
  it('should on update user else error',()=>{
    component.specificUser={
      _id:'sdfsdf'
    };
    let specificUser={
      _id:'sdfs'
    }
    let payload={
      email:'vnadn@gmail.com',
      password:'sdfsdf',
      name:'sdfsdf'
    }
    component.editRoleStatus=false;
    spyOn(httpService,'updateUserDetails').and.returnValues(throwError({error:{message:'throw error'}}));
    component.onUpdateUser();
    expect(httpService.updateUserDetails).toHaveBeenCalled();
  });
});

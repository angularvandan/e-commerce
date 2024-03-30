import { ComponentFixture, TestBed, async, fakeAsync, flush, tick } from '@angular/core/testing';

import { SelfComponent } from './self.component';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ImageCroppedEvent, ImageCropperModule, base64ToFile } from 'ngx-image-cropper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2';

describe('SelfComponent', () => {
  let component: SelfComponent;
  let fixture: ComponentFixture<SelfComponent>;
  let httpService: HttpService;
  let userService: UserService;
  let router: Router;
  let httpClient: HttpClient;
  let myRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelfComponent],
      providers: [SelfComponent, HttpService, UserService, HttpClient,
        { provide: Router, useValue: myRouter },

      ],
      imports: [HttpClientModule, ImageCropperModule, ToastrModule.forRoot(), FormsModule, ReactiveFormsModule]
    })
      .compileComponents();
  });
  beforeEach(async () => {

    httpService = TestBed.inject(HttpService);
    userService = TestBed.inject(UserService);
    component = TestBed.inject(SelfComponent);
    httpClient = TestBed.inject(HttpClient);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;


    fixture = TestBed.createComponent(SelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get self', () => {
    spyOn(httpService, 'self').and.returnValues(of({}));
    component.getSelf();
    expect(httpService.self).toHaveBeenCalled();
  });
  it('Should get self error', () => {
    spyOn(httpService, 'self').and.returnValues(of(throwError({ error: { message: 'error occur' } })));
    component.getSelf();
    expect(httpService.self).toHaveBeenCalled();
  });
  it('Should be update image', () => {
    const formData = new FormData();
    formData.append('picture', component.image);
    spyOn(httpService, 'updateProfilePicture').and.returnValues(of(formData));
    component.onUpdateImage();
    expect(httpService.updateProfilePicture).toHaveBeenCalled();
  });
  it('Should be update image error', () => {
    spyOn(httpService, 'updateProfilePicture').and.returnValues(throwError({ error: { message: 'error occur' } }));
    component.onUpdateImage();
    expect(httpService.updateProfilePicture).toHaveBeenCalled();
  });
  it('should delete profile picture', fakeAsync(() => {
    const response = { success: true };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as SweetAlertResult<any>));

    spyOn(httpService, 'deleteProfilePicture').and.returnValues(of({ response }));
    spyOn(component, 'getSelf').and.returnValues();
    component.onDeleteImage();
    tick();
    expect(httpService.deleteProfilePicture).toHaveBeenCalled();
    expect(component.getSelf).toHaveBeenCalled();
    expect(swalFireSpy).toHaveBeenCalledWith('Deleted!', 'Your file has been deleted.', 'success');
  }));

  it('should delete profile picture error', fakeAsync(() => {
    const error = { error: { message: 'Deletion failed' } };
    const swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as SweetAlertResult<any>));

    spyOn(httpService, 'deleteProfilePicture').and.returnValues(throwError(error));
    component.onDeleteImage();
    tick();
    expect(httpService.deleteProfilePicture).toHaveBeenCalled();
    expect(swalFireSpy).toHaveBeenCalledWith('Deletion failed');
  }));
  it('should edit profile', () => {
    component.onEditProfile();
    expect(component.onEditProfile).toBeDefined();
  });
  it('should on cancel', () => {
    component.onCancel();
    expect(component.onCancel).toBeDefined();
  });
  it('should on edit profile saved', () => {
    spyOn(httpService, 'updateProfile').and.returnValues(of({ name: 'fsds', email: 'sdfs' }));
    component.onEditProfileSave();
    expect(httpService.updateProfile).toHaveBeenCalled();
  });
  it('should on edit profile saved error', () => {
    spyOn(httpService, 'updateProfile').and.returnValues(throwError({ error: { message: 'error occur' } }));
    component.onEditProfileSave();
    expect(httpService.updateProfile).toHaveBeenCalled();
  });
  it('should on add address', () => {
    component.onAddAddress();
    expect(myRouter.navigate).toHaveBeenCalledWith(['shop/customer/add-address'])
  });
  it('should on get address', () => {
    component.onGetAddress();
    expect(myRouter.navigate).toHaveBeenCalledWith(['shop/customer/get-address'])
  });
  it('should on file change event', () => {
    const file = new File(['sample file'], 'sample.png', { type: 'image/png' });
    const event = {
      target: {
        files: [file],
      },
    };
    component.fileChangeEvent(event);
    expect(component.imageChangedEvent).toBe(event);
    expect(component.imageName).toBe('sample.png');
  });
  it('should on image cropped event', () => {
    const base64Image = "QFoAtAK0KFqAVoULVAr";
    const event = {
      base64: base64Image,
      width: 300, // Example width value
      height: 200, // Example height value
      cropperPosition: { x1: 10, y1: 20, x2: 100, y2: 150 }, // Example cropper position
      imagePosition: { x1: 0, y1: 0, x2: 300, y2: 200 }, // Example image position
    };
    component.imageCropped(event as any);
    // Assuming you have a utility function called 'base64ToFile' that converts base64 to File
    const expectedImage = base64ToFile(base64Image);
    expect(component.image).toEqual(expectedImage);

  });




});

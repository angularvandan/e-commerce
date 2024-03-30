import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewProductComponent } from './view-product.component';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxEditorModule } from 'ngx-editor';
import { ToastrModule } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('ViewProductComponent', () => {
  let component: ViewProductComponent;
  let fixture: ComponentFixture<ViewProductComponent>;
  let httpService:HttpService;
  let userService:UserService;
  let activatedRoute:ActivatedRoute;

  let myRouter = {
    navigate: jasmine.createSpy('navigate')
  }
  
  const mockActivatedRoute = { 
    queryParamMap: of({id:'sdfsd'}) 
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewProductComponent],
      providers:[ViewProductComponent,HttpService,UserService,
        {
          provide:Router,useValue:myRouter
        },{
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
      ],
      imports: [ToastrModule.forRoot(),HttpClientTestingModule,NgxEditorModule,NgxDropzoneModule,
        ReactiveFormsModule,FormsModule],
    })
    .compileComponents();

  });
  beforeEach(()=>{

    httpService=TestBed.inject(HttpService);
    userService=TestBed.inject(UserService);
    component=TestBed.inject(ViewProductComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);


    fixture = TestBed.createComponent(ViewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be onGetProduct',()=>{
    let response={
      images:{
        url:'abcd',
      }
    };
    spyOn(httpService,'getProduct').and.returnValues(of(response));
    component.onGetProduct();
    expect(httpService.getProduct).toHaveBeenCalled();
  });
  it('should be onShowBigImage', () => {
    let image={
      url:'sfdsffs',
      public_id:'sdfsdf'
    }
    component.onShowBigImage(image);
    expect(component.bigImageId).toBe(image.public_id);
  });

  it('should be onFiles', () => {
    let files={
      target:{
        files:['s','p']
      },
    }
    component.onFile(files);
    expect(component.images).toEqual(files.target.files);
  });

  it('should show confirmation dialog when prompted', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.onAddAndDeleteImages();
    expect(window.confirm).toHaveBeenCalledWith('Do you want to add or delete ?');
  });
  it('should not proceed if user cancels the confirmation dialog', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(httpService, 'updateImage');
    component.onAddAndDeleteImages();
    expect(httpService.updateImage).not.toHaveBeenCalled();
  });
  it('should append existing images to FormData for addition', (done:DoneFn) => {

    const file = new File(['sample file'], 'sample.png', { type: 'image/png' });
    const formData = new FormData();
    formData.append('delete','existing2.png');
    formData.append("new_images",file);

    component.images.push(file);
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(httpService, 'updateImage').and.returnValues(of(formData,'fghf'));
    component.onAddAndDeleteImages();
    done();
    expect(formData.has('new_images')).toBe(true);
    expect(httpService.updateImage).toHaveBeenCalled();
  });
  it('should append existing images to FormData for addition eroor', (done:DoneFn) => {

    const file = new File(['sample file'], 'sample.png', { type: 'image/png' });
    const formData = new FormData();
    formData.append('delete','existing2.png');
    formData.append("new_images",file);

    component.images.push(file);
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(httpService, 'updateImage').and.returnValues(throwError({error:{message:'error occur'}}));
    component.onAddAndDeleteImages();
    done();
    expect(formData.has('new_images')).toBe(true);
    expect(httpService.updateImage).toHaveBeenCalled();
  });
  it('should be', () => {
    component.onResetInputField();
    expect(component.ele.nativeElement.value).toEqual('');
  });


});

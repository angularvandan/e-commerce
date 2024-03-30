import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductComponent } from './create-product.component';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxEditorModule, toHTML } from 'ngx-editor';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { of } from 'rxjs';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let httpService:HttpService;
  let userService:UserService;
  let router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProductComponent ],
      providers:[HttpService,UserService,CreateProductComponent],
      imports: [ToastrModule.forRoot(),HttpClientTestingModule,NgxEditorModule,NgxDropzoneModule,
      ReactiveFormsModule,FormsModule],
    })
    .compileComponents();

  });
  beforeEach(()=>{
    userService=TestBed.inject(UserService);
    httpService=TestBed.inject(HttpService);
    router=TestBed.inject(Router) as jasmine.SpyObj<Router>;
    component=TestBed.inject(CreateProductComponent);

    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be on create product',()=>{
    let obj={
      "type": "doc",
      "content": [
          {
              "type": "paragraph",
              "attrs": {
                  "align": null
              },
              "content": [
                  {
                      "type": "text",
                      "text": "pur"
                  },
                  {
                      "type": "text",
                      "marks": [
                          {
                              "type": "strong"
                          }
                      ],
                      "text": "e"
                  },
                  {
                      "type": "text",
                      "marks": [
                          {
                              "type": "em"
                          },
                          {
                              "type": "strong"
                          }
                      ],
                      "text": " water"
                  }
              ]
          },
          {
              "type": "heading",
              "attrs": {
                  "level": 3,
                  "align": null
              },
              "content": [
                  {
                      "type": "text",
                      "text": "20 rupees"
                  },
                  {
                      "type": "text",
                      "marks": [
                          {
                              "type": "text_color",
                              "attrs": {
                                  "color": "#0e8a16"
                              }
                          }
                      ],
                      "text": " fine"
                  }
              ]
          }
      ]
  };
    const html = toHTML(obj);
    // console.log(html,'sdfsf');
    component.html=html;
    const formData = new FormData();
    const file = new File(['sample file'], 'sample.png', { type: 'image/png' });

    formData.append("name",'vandna');
    formData.append("description",html);
    formData.append("images",file);
    formData.append("price",'234234');

    component.files = [  ]

    spyOn(httpService,'createProducts').and.returnValues(of(formData));
    component.onCreateProduct();
    expect(httpService.createProducts).toHaveBeenCalled();
  });
  it('should be on select',()=>{
    let event={
      addedFiles:'sds'
    }
    component.onSelect(event);
    expect(component.onSelect).toBeDefined();
  });
  it('should be on remove',()=>{
    let event={
      addedFiles:'sds'
    }
    component.onRemove(event);
    expect(component.onRemove).toBeDefined();
  });



});

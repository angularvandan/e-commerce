import { TestBed } from "@angular/core/testing";
import { UserService } from "./user.service";
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from "ng-recaptcha";
import environment from "src/environment/environment";
import { CaptchaService } from "./captcha.service";
import { HttpService } from "./http.service";
import { ToastrModule } from "ngx-toastr";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgxDropzoneModule } from "ngx-dropzone";
import { NgxEditorModule } from "ngx-editor";

fdescribe('CaptchaService', () => {
    let service: UserService;
    let httpService:HttpService;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers:[UserService,HttpService,
        ],
        imports: [ToastrModule.forRoot(),HttpClientTestingModule,NgxEditorModule,NgxDropzoneModule,
            ReactiveFormsModule,FormsModule],
      });
      service=TestBed.inject(UserService);
      httpService=TestBed.inject(HttpService);
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
});
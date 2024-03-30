import { TestBed } from '@angular/core/testing';

import { CaptchaService } from './captcha.service';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import environment from 'src/environment/environment';

describe('CaptchaService', () => {
  let service: CaptchaService;
  let reCaptchaV3Service: ReCaptchaV3Service;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[CaptchaService,ReCaptchaV3Service,
        { provide: RECAPTCHA_V3_SITE_KEY, useValue:environment.reCaptchaKey },
      ]
    });
    service = TestBed.inject(CaptchaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be execute',async ()=>{
    await service.execute().then((value:any)=>{
      expect(value).toBeDefined()
    }).catch((e)=>fail(e));
  });

});

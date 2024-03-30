import { Injectable } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  constructor(private reCaptcha: ReCaptchaV3Service) { }

  execute(action?: string): any {
    return new Promise((resolve, reject) => {
      this.reCaptcha.execute('REGISTER').subscribe({
        next: (result) => {
          // console.log(result);
          resolve(result);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }
}

import { Injectable } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  constructor(private reCaptcha:ReCaptchaV3Service) { }

  execute(action?:string){
    return new Promise((resolve,reject)=>{
      this.reCaptcha.execute('register').subscribe({
        next:(result)=>{
          resolve(result);
        },
        error:(err)=>{
          reject(err);
        }
      });
    });
  }
}

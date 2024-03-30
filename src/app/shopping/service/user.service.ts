import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private toastrService:ToastrService,private httpService:HttpService) { }
  loginRegisterStatus=new Subject();
  cartCount=new BehaviorSubject(0);
  showSuccess(message:string) {
    this.toastrService.success(message);
  }
  showWarning(message:string) {
    this.toastrService.warning(message);
  }
  getSelf(){
    return new Promise<boolean>((resolve,reject)=>{
      this.httpService.self().subscribe((response:any)=>{
        resolve(true);
      },(err: any)=>{
        reject(false);
      });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.css']
})
export class EmailVerifyComponent implements OnInit{
  
  token!:string;
  constructor(private router:Router ,private routeActivated:ActivatedRoute
    ,private httpService:HttpService,private userService:UserService){

  }
  ngOnInit(): void {
    setTimeout(()=>{
      this.getTokenFromUrl();
    },10);
  }
  getTokenFromUrl(){
    this.routeActivated.queryParamMap.subscribe(params=>{
      this.token=params.get('token')||'';
      console.log(this.token);
      if(this.token==''){
        this.router.navigate(['auth/login']);
      }else{
        // console.log('email success');
        this.onVerifyAccount();
      }
    });
  }
  onVerifyAccount(){
    this.httpService.verifyAccount(this.token).subscribe(response=>{
      this.userService.showSuccess('Email has verified');
    },err=>{
      this.httpService.error.next(err.error.message);
      this.userService.showWarning(err.error.message);
      this.router.navigate(['auth/login']);
    },()=>{
      this.router.navigate(['setting/my-profile']);
    })
  }

}

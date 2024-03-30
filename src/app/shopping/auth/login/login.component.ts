import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { CaptchaService } from '../../service/captcha.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  reactiveForm!:FormGroup;
  captcha:any;
  payLoad={
    email:'',
    password:'',
    captcha:''
  };
  constructor(private httpService:HttpService,private userService:UserService
    ,private captchaService:CaptchaService,private router:Router){
      
      this.userService.getSelf().then((res)=>{
        router.navigate(['shop/customer/profile']);
      })
  }

  async executeCaptchaService(){
    this.captcha=await this.captchaService.execute('Login');
  }
  ngOnInit(): void {
    this.executeCaptchaService();
    this.reactiveForm=new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,Validators.required)
    });
    // for display captcha
    var ele: any = document.querySelector('.grecaptcha-badge');
      // console.log(ele);
      if(ele!=null){
        ele.style.display = 'block';
      }
  }
  onLogin(){
    // {...this.reactiveForm.value,captcha:this.captcha}
    this.httpService.login({...this.reactiveForm.value}).subscribe((response:any)=>{
      console.log(response);
      localStorage.setItem('CustomerToken',JSON.stringify(response.token));
      this.executeCaptchaService();
    },err=>{
      this.userService.showWarning(err.error.message);
      this.executeCaptchaService();
    },()=>{
      this.reactiveForm.reset();
      this.userService.loginRegisterStatus.next(true);
      this.router.navigate(['shop/customer/profile']);
      this.userService.showSuccess('Login Successfully');
    });
  }
}

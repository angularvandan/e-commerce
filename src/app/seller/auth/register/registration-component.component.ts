import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../Model/register';
import { CaptchaService } from '../../service/captcha.service';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-registration-component',
  templateUrl: './registration-component.component.html',
  styleUrls: ['./registration-component.component.css']
})
export class RegistrationComponentComponent implements OnInit{
  reactiveForm!:FormGroup;
  registerData:{}[]=[];
  registerDataByUrl!:Register;
  tokenValue:string[]=[];
  errMessage!:string;
  captcha!:string;

  constructor(private router:Router,private userService:UserService,
    private httpService:HttpService,private captchaService:CaptchaService){
    // fetch data from local storage every timeInterval
    // let data=JSON.parse(localStorage.getItem('RegisterData')||'[]');
    // this.registerData=data;
    // below code is for redirect on my-profile
    // if(userService.specificUser!=undefined){
    //   router.navigate(['my-profile']);
    // }

    let token=JSON.parse(<string>localStorage.getItem('token1'));
    if(token!=null){
      this.router.navigate(['setting/my-profile']);
      setTimeout(() => {
        var ele: any = document.querySelector('.grecaptcha-badge');
        console.log(ele);
        if(ele!=null){
          ele.style.display = 'none';
        }
      }, 1000);
    }
  }
  ngOnInit():void{
    this.reactiveForm=new FormGroup({
      name:new FormControl(null,[Validators.required,
        Validators.pattern('[a-zA-z]*[ a-zA-Z]+([a-zA-Z]){2}')]),
      cName:new FormControl(null,[Validators.required,
        Validators.pattern('[a-zA-z]*[ a-zA-Z]+([a-zA-Z]){2}')]),
      role:new FormControl(null,[Validators.required,
        Validators.pattern('^[a-zA-z]+[. a-zA-Z]+([a-zA-Z]){2}$')]),
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required]),
      isLogin:new FormControl(false)
    });
    this.executeCaptchaService();
  }
  async executeCaptchaService(){
    this.captcha=await this.captchaService.execute('REGISTER');
  }
  onSubmit(){
    // console.log(this.reactiveForm);
    // push the data into out Property
    this.executeCaptchaService();
    this.registerDataByUrl={
      email:this.reactiveForm.value.email,
      password:this.reactiveForm.value.password,
      name:this.reactiveForm.value.name,
      company:this.reactiveForm.value.cName,
      // captcha:this.captcha
    }

    this.httpService.createRegister(this.registerDataByUrl).subscribe({
      next:(response:any)=>{
      // console.log(response.token);
      this.tokenValue.push(response.token);
      localStorage.setItem('token',JSON.stringify(this.tokenValue));
      this.executeCaptchaService();
      this.userService.showSuccess('Register Successfully');
    },
    error:err=>{
      this.userService.showWarning(err.error.message);
      this.executeCaptchaService();
    },complete:()=>{
      this.onNavigateLogin();
    }
  });
    
    this.registerData.push(this.reactiveForm.value);
    // this.pushLocalStorage(this.registerData);
    this.reactiveForm.reset();
    // this.onNavigateLogin();
  }
  onNavigateLogin(){
    this.router.navigate(['auth/login']);
  }
  // pushLocalStorage(data:object){
  //   localStorage.setItem('RegisterData',JSON.stringify(data));
  // }
}

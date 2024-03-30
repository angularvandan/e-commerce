import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../Model/login';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { CaptchaService } from '../../service/captcha.service';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit{

  reactiveForm!:FormGroup;
  validUser:boolean=false;
  specificUser:{}[]=[];
  allUserData:{}[]=[];
  loginUserByUrl!:Login;
  tokenValue:string='';
  errMessage!:string;
  captcha!:string;
  googleData!:{token:string,captcha:string};
  forgot_email!:any;


  constructor(private router:Router,private userService:UserService,
    private httpService:HttpService,private captchaService:CaptchaService
    ,private socialAuthService: SocialAuthService) {
    //below code is for redirect on my-profile
    // if(userService.specificUser!=undefined){
    //   router.navigate(['my-profile']);
    // }
    let token=JSON.parse(<string>localStorage.getItem('token1'));
    if(token!=null){
      this.router.navigate(['setting/my-profile']);
      setTimeout(() => {
        var ele: any = document.querySelector('.grecaptcha-badge');
        // console.log(ele);
        if(ele!=null){
          ele.style.display = 'none';
        }
      }, 1000);
    }
  }

  ngOnInit():void{
    this.reactiveForm=new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required])
    });
    this.executeCaptchaService();
  }
  async executeCaptchaService(){
    this.captcha=await this.captchaService.execute('LOGIN');
  }
  onSubmit(){
    this.executeCaptchaService();
    this.loginUserByUrl={
      email:this.reactiveForm.get('email')?.value,
      password:this.reactiveForm.get('password')?.value,
      // captcha:this.captcha
    }
    this.httpService.createLogin(this.loginUserByUrl).subscribe({
      next:(response:any)=>{
      console.log(response);
      this.tokenValue=response.token;
      localStorage.setItem('token1',JSON.stringify(this.tokenValue));
      this.executeCaptchaService();
    },
    error:(err)=>{
      this.executeCaptchaService();
      this.userService.showWarning(err.error.message);
    },
    complete:()=>{
      this.userService.showSuccess('Login Successfully');
      this.router.navigate(['setting/my-profile']);
    }
    });

  }
  onGoogleSignIn(){
    this.executeCaptchaService();
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((response)=>{
      console.log(GoogleLoginProvider.PROVIDER_ID);
      console.log(response);
      let token=response.idToken;
      this.httpService.googleSignIn({token:token,captcha:this.captcha}).subscribe(
        (response:any)=>{
        console.log(response);
        this.tokenValue=response.token;
        localStorage.setItem('token1',JSON.stringify(this.tokenValue));
        this.userService.showSuccess('Login Successfully');
      },(err)=>{
        this.httpService.error.next(err.error.message);
        this.userService.showWarning(err.error.message);

      },()=>{
        this.router.navigate(['setting/my-profile']);
      });
    });
  }
  onForgot(){
    let email=this.forgot_email;
    this.forgot_email='';
    this.executeCaptchaService();
    // console.log(email);
    this.httpService.forgotPassword({email:email,captcha:this.captcha}).subscribe((response:any)=>{
      this.userService.showSuccess('Email has send');
      this.executeCaptchaService();
    },(err)=>{
      this.httpService.error.next(err.error.message);
      this.userService.showSuccess(err.error.message);
      this.executeCaptchaService();
    });    
  }
}

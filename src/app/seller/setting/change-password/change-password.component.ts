import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{
  reactiveForm!: FormGroup;
  changesData!:{old_password:string,new_password:string};
  eyeStatus1:boolean=true;
  eyeStatus2:boolean=true;
  typeOfElement1:string='password';
  typeOfElement2:string='password';

  constructor(private userService:UserService,private httpService:HttpService
    ,private router:Router){
      
    }
  ngOnInit():void{
    this.reactiveForm=new FormGroup({
      password1:new FormControl(null,[Validators.required]),
      password2:new FormControl(null,[Validators.required]),
      password3:new FormControl(null,[Validators.required])
    });
  }
  onChange(){
    this.changesData={
      old_password:this.reactiveForm.get('password1')?.value,
      new_password:this.reactiveForm.get('password2')?.value,
    }
    let new_password=this.reactiveForm.get('password2')?.value;
    let confirm_password=this.reactiveForm.get('password3')?.value;
    if(new_password==confirm_password){
      this.httpService.changePassword(this.changesData).subscribe({
        next:(response:any)=>{
        console.log(response);
        this.userService.showSuccess('Password has changed');
        setTimeout(()=>{
          this.router.navigate(['setting/my-profile']);
        },1000);
      },
      error:(err)=>{
        this.httpService.error.next(err.error.message);
        this.userService.showWarning(err.error.message);
      },
      });
    }
    else{
      this.userService.showWarning('Confirm password not match');
    }
  }
  onShowHideEye1(){
    if(this.eyeStatus1){
      this.eyeStatus1=false;
      this.typeOfElement1='text'
    }else{
      this.eyeStatus1=true;
      this.typeOfElement1='password'
    }

  }
  onShowHideEye2(){
    if(this.eyeStatus2){
      this.eyeStatus2=false;
      this.typeOfElement2='text'
    }else{
      this.eyeStatus2=true;
      this.typeOfElement2='password';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { HttpService } from '../../service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{

  reactiveForm!:FormGroup;
  constructor(private userService:UserService,private httpService:HttpService,
    private router:Router){
  }
  ngOnInit(): void {
    this.reactiveForm=new FormGroup({
      old_password:new FormControl(null,Validators.required),
      new_password:new FormControl(null,Validators.required),
      confirm_password:new FormControl(null,Validators.required),
    });
  }
  onChange(){
    let payload={
      old_password:this.reactiveForm.value.old_password,
      new_password:this.reactiveForm.value.new_password,
    }
    this.httpService.changePassword(payload).subscribe((response:any)=>{
      // console.log(response);
    },err=>{
      // console.log(err.error.message);
      this.userService.showWarning(err.error.message);
    },()=>{
      this.userService.showSuccess('Successfully changed');
      this.router.navigate(['shop/products']);
    });
  }

}

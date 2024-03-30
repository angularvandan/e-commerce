import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit{
  reactiveForm!:FormGroup;
  cName!:string;
  eValue!:string;

  constructor(private router:Router, private userService:UserService,private httpService:HttpService){}

  ngOnInit():void{
    this.reactiveForm=new FormGroup({
      cName:new FormControl(this.userService.specificUserByUrl?._org.name,[Validators.required,
        Validators.pattern('[a-zA-z]*[ a-zA-Z]+([a-zA-Z]){2}')])
    });
  }

  onChangesUserDetails(){
    this.cName=this.reactiveForm.controls['cName'].value;
    this.httpService.updateUserCompanyDetails({name:this.cName})
    .subscribe(response=>{
      console.log(response);
      this.userService.showSuccess('Company name has changed')
      this.router.navigate(['setting/my-profile']);

    },err=>{
      this.userService.showSuccess(err.error.message);
    });
  }

}

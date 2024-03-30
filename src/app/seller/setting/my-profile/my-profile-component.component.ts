import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-my-profile-component',
  templateUrl: './my-profile-component.component.html',
  styleUrls: ['./my-profile-component.component.css']
})
export class MyProfileComponentComponent implements OnInit{
  specificUser!:any;
  specificUserByUrl!:any;
  dataComingStatus:boolean=false;
  logOutUser:{}[]=[];
  successMessage!:string;

  cName!:string;
  captcha!:string;
  
  constructor(private userService:UserService,private router:Router
    ,private httpService:HttpService,private activatedRouter:ActivatedRoute
    ){
      var ele: any = document.querySelector('.grecaptcha-badge');
      // console.log(ele);
      if(ele!=null){
        ele.style.display = 'none';
      }
      //navbar show
      userService.nav.next(false);
  }
  ngOnInit(): void {
    this.httpService.fetchUserDetails().subscribe((response:any)=>{
      // console.log(response);
      this.specificUserByUrl=response;
      this.userService.specificUserByUrl=this.specificUserByUrl;
      this.dataComingStatus=true;
    },err=>{
      this.userService.showWarning(err.error.message);
      localStorage.removeItem('token1');
      this.dataComingStatus=true;
      this.router.navigate(['auth/login']);
    },()=>{
    });
  }
  onVerifyEmail(){
    this.httpService.verifyEmail().subscribe(response=>{
      console.log(response);
      this.userService.showSuccess('Link has send');
    },err=>{
      this.httpService.error.next(err.error.message);
      this.userService.showWarning(err.error.message);
    });
  }
}
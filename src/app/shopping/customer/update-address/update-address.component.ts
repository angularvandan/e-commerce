import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent implements OnInit{

  reactiveForm!:FormGroup;
  addressId!:any;
  specificAddress:any;

  constructor(private userService:UserService,private httpService:HttpService,
    private router:Router,private activatedRoute:ActivatedRoute){
  }
  ngOnInit(): void {
    this.reactiveForm=new FormGroup({
      street:new FormControl(null,Validators.required),
      addressLine2:new FormControl(null,Validators.required),
      state:new FormControl(null,Validators.required),
      city:new FormControl(null,Validators.required),
      pin:new FormControl(null,[Validators.required,Validators.pattern('^[0-9]+([0-9]){5}$')]),
    });
    setTimeout(()=>{
      this.activatedRoute.queryParamMap.subscribe((response:any)=>{
        // console.log(response.get('id'));
        this.addressId=response.get('id');
      });
    },10);
    this.getAddress();
  }
  getAddress(){
    this.httpService.getAddressById(this.addressId).subscribe((response:any)=>{
      console.log(response);
      this.specificAddress=response;
    },err=>{
      console.log(err);
    },()=>{
      this.reactiveForm.patchValue({
        street:this.specificAddress?.street,
        addressLine2:this.specificAddress?.addressLine2,
        state:this.specificAddress?.state,
        city:this.specificAddress?.city,
        pin:this.specificAddress?.pin,
      });
    });
  }
  onUpdateAddress(){
    this.httpService.updateAddress(this.reactiveForm.value,this.addressId).subscribe((response)=>{
      console.log(response);
    },err=>{
      console.log(err);
    },()=>{
      this.userService.showSuccess('Successfully Updated');
      this.router.navigate(['shop/customer/get-address']);
    });
  }
}

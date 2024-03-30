import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit{

  reactiveForm!:FormGroup;
  constructor(private userService:UserService,private httpService:HttpService,
    private router:Router){
  }
  ngOnInit(): void {
    this.reactiveForm=new FormGroup({
        street:new FormControl(null,Validators.required),
        addressLine2:new FormControl(null,Validators.required),
        state:new FormControl(null,Validators.required),
        city:new FormControl(null,Validators.required),
        pin:new FormControl(null,[Validators.required,Validators.pattern('^[0-9]+([0-9]){5}$')]),
    });
  }
  onAddAddress(){
    this.httpService.addAddress(this.reactiveForm.value).subscribe((response:any)=>{
      console.log(response);
    },err=>{
      console.log(err);
      this.userService.showWarning(err.error.message);
    },()=>{
      this.userService.showSuccess('Successfully Added');
      this.router.navigate(['shop/customer/profile']);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { HttpService } from '../../service/http.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-address',
  templateUrl: './get-address.component.html',
  styleUrls: ['./get-address.component.css']
})
export class GetAddressComponent implements OnInit{

  allAddress:any[]=[];

  constructor(private userService:UserService,private httpService:HttpService,
    private router:Router){
  }
  ngOnInit(): void {
    
  this.getAddress();
  }
  getAddress(){
    this.httpService.getSavedAddress().subscribe((response:any)=>{
      console.log(response);
      this.allAddress=response;
    },err=>{
      console.log(err);
    });
  }
  onUpdateAddress(addressId:any){
    this.router.navigate(['shop/customer/update-address'],{queryParams:{id:addressId}})
  }
  onDeleteAddress(addressId:any){
    console.log(addressId);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpService.deleteAddress(addressId).subscribe((response:any)=>{
          console.log(response);
        },err=>{
          console.log(err);
          Swal.fire(
            err.error.message
          )
        },()=>{
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.getAddress();
        });
      }
    })
  }
}

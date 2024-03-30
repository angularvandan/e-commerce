import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-remove-account',
  templateUrl: './remove-account.component.html',
  styleUrls: ['./remove-account.component.css']
})
export class RemoveAccountComponent implements OnInit{

  constructor(private httpService:HttpService,private userService:UserService,
    private router:Router){
  }
  ngOnInit(): void {
    this.removeAccount();
  }
  removeAccount(){
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
        this.httpService.removeAccount().subscribe((response:any)=>{
          console.log(response);
        },err=>{
          console.log(err.error.message);
          this.userService.showWarning(err.error.message);
          Swal.fire(
            err.error.message
          )
        },()=>{
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.userService.loginRegisterStatus.next(false);
          localStorage.removeItem('CustomerToken');
          this.router.navigate(['shop/auth/login']);
        });
      }
      else{
        this.router.navigate(['shop/customer/profile']);
      }
    })
  }
}

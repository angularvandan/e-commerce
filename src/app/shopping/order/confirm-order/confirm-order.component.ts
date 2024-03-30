import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit{

  cardForm!:FormGroup;
  orderId!:any;
  constructor(private httpService:HttpService,private activatedRoute:ActivatedRoute,
    private userService:UserService,private router:Router){}

  ngOnInit(): void {
    this.cardForm=new FormGroup({
      nameOnCard:new FormControl(null,Validators.required),
      cardNumber:new FormControl(null,Validators.required),
      expiry:new FormControl(null,Validators.required),
      cvv:new FormControl(null,Validators.required),
    });
    this.activatedRoute.queryParamMap.subscribe(response=>{
      console.log(response.get('id'));
      this.orderId=response.get('id');
    });
  }
  onConfirmOrder(){
    console.log(this.cardForm);
    this.httpService.confirmOrder(this.cardForm.value,this.orderId).subscribe((response)=>{
      console.log(response);
    },err=>{
      console.log(err.error.message);
      this.userService.showWarning(err.error.message);
    },()=>{
      this.userService.showSuccess('Order Confirm Successfully');
      this.router.navigate(['shop/order/order-history'])
    });
  }
}

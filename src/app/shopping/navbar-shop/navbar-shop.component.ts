import { Component, OnChanges, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';
import { Store } from '@ngrx/store';
import { OrderState } from '../order/state/order.state';
import { getProducts } from '../order/state/order.selector';

@Component({
  selector: 'app-navbar-shop',
  templateUrl: './navbar-shop.component.html',
  styleUrls: ['./navbar-shop.component.css']
})
export class NavbarShopComponent implements OnInit{

  loginRegisterStatus:boolean=false;
  products:any;
  totalCart:number=0;

  constructor(private router:Router,private userService:UserService,
    private httpService:HttpService){
  }
  ngOnInit(): void {
    this.userService.getSelf().then((res)=>{
      this.userService.loginRegisterStatus.next(res);
    })
    this.userService.loginRegisterStatus.subscribe((response:any)=>{
      this.loginRegisterStatus=response;
    });
    this.userService.cartCount.subscribe(res=>{
      this.totalCart=res;
    });
    this.cartCount();
  }
  cartCount(){
    let cartItems=JSON.parse(localStorage.getItem('products')||'[]');
    this.userService.cartCount.next(cartItems.length);
  }
  onLogOut(){
    this.loginRegisterStatus=false;
    this.userService.loginRegisterStatus.next(false);
    localStorage.removeItem('CustomerToken');
    this.userService.showSuccess('Successfully Logout');
    this.router.navigate(['shop/auth/login']);
  }
  onDeleteAccount(){
      this.router.navigate(['shop/customer/remove-account']);
  }
}

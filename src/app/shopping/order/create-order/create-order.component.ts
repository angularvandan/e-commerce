import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { OrderState } from '../state/order.state';
import { getProducts } from '../state/order.selector';
import { addLocalToState } from '../state/order.actions';


@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit{

  products:any[]=[];
  totalProducts:number=0;
  allAddress:any[]=[];
  totalPrice!:number;
  totalDiscount:number=0;

  specificAddress={
    street: '' ,
    addressLine2: '' ,
    city: '' ,
    state: '', 
    pin: ''
  };
  orderId!:any;
  
  addressChecked:boolean=false;

  constructor(private httpService:HttpService,private userService:UserService,
    private router:Router,private store:Store<OrderState>){}

  ngOnInit(): void {
    this.httpService.getSavedAddress().subscribe((response:any)=>{
      console.log(response);
      this.allAddress=response;
    });
    this.getAllProductFromStore();
    this.getTotalPrice();
  }
  getAllProductFromStore(){
    this.store.dispatch(addLocalToState());
    this.store.select(getProducts).subscribe((res:any)=>{
      this.products=res;
      console.log(this.products);
    });
    console.log(this.products);
    this.totalProducts=this.products.length;

  }
  getTotalPrice(){
    this.totalPrice=0;
    this.totalDiscount=0;

    for(let product of this.products){
      this.totalPrice+=product.totalPrice;
    }
    //this is for discount
    for(let product of this.products){
      this.totalDiscount+=product.price*product.count;
    }
    this.totalDiscount=this.totalDiscount-this.totalPrice;
    this.totalDiscount=Number(this.totalDiscount.toFixed(2));

    this.totalPrice=Number(this.totalPrice.toFixed(2));
    console.log(this.totalPrice);
  }
  onRadioAddress(addressId:string){
    console.log(addressId);
    this.httpService.getAddressById(addressId).subscribe((response:any)=>{
      this.specificAddress={
        street: response.street ,
        addressLine2: response.addressLine2 ,
        city: response.city ,
        state: response.state, 
        pin: response.pin
      }
      this.addressChecked=true;
      console.log(this.specificAddress);
    },error=>{
      console.log(error);
    });
  }
  onCreateOrder(){
    if(this.addressChecked){
      let items=[];
      for(let item of this.products){
        items.push({
          productId: item?._id, 
          name: item?.name,
          price: item?.price ,
          qty: item?.count ,
          subTotal: item?.totalPrice
        });
      }
      let payLoad:any={
        items:items,
        deliveryFee:40,
        total:this.products.length,
        address:this.specificAddress,
      }
      this.httpService.createOrder(payLoad).subscribe((response:any)=>{
        console.log(response);
        this.orderId=response.order._id;
      },err=>{
        console.log(err.error.message);
      },()=>{
        this.router.navigate(['shop/order/confirm-order'],{queryParams:{id:this.orderId}});
      })
    }
    else{
      this.userService.showWarning('Select one address');
    }
  }
}

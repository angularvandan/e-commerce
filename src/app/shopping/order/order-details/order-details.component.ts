import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{

  products:any[]=[];
  deliveryFee:number=0;
  totalProducts:number=0;
  totalPrice:number=0;
  totalDiscount:number=0;

  orderId!:string;
  showBigImage: any;
  productImage:any[]=[];
  cancelStatus:boolean=false;
  confirmStatus:boolean=false;

  constructor(private httpService:HttpService,private activatedRoute:ActivatedRoute,
    private userService:UserService,private router:Router){}
  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((response:any)=>{
      this.orderId=response.get('id');
    });
    console.log(this.orderId);
    this.onOrderDetails();
  }
  onOrderDetails(){
    this.httpService.orderDetails(this.orderId).subscribe((response:any)=>{
      console.log(response);
      this.products=response.items;
      this.totalProducts=this.products.length;
      this.deliveryFee=response.deliveryFee;
      if(response.status=='Confirmed'){
        this.cancelStatus=true;
        this.confirmStatus=false;

      }
      else if(response.status=='Cancelled'){
        this.cancelStatus=false;
        this.confirmStatus=false;

      }
      else if(response.status=='Pending'){
        this.cancelStatus=true;
        this.confirmStatus=true;
      }
    },err=>{
      console.log(err.error.message)
    },()=>{
      this.onTotalPrice();
      this.onProductImage();
    });
  }
  onProductImage(){
    for(let product of this.products){
      console.log(product.productId);
      this.httpService.getProduct(product.productId).subscribe((response:any)=>{
        console.log(response);
        this.productImage.push(response.images[0].url);
        console.log(this.productImage);
      },err=>{
        console.log(err);
      });
    }
  }
  onTotalPrice(){
    this.totalPrice=0;
    this.totalDiscount=0;
    for(let product of this.products){
      this.totalPrice+=product.subTotal;
      this.totalDiscount+=product.price*product.qty;
    }
    this.totalDiscount=this.totalDiscount-this.totalPrice;
    this.totalDiscount=Number(this.totalDiscount.toFixed(2));
    this.totalPrice+=this.deliveryFee;
  }
  onConfirmOrder(){
    this.router.navigate(['shop/order/confirm-order'],{queryParams:{id:this.orderId}})
  }
  onCancelOrder(){
    console.log(this.orderId);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel order!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpService.cancelOrder(this.orderId).subscribe((response:any)=>{
          console.log(response);
        },err=>{
          console.log(err.error.message);
          this.userService.showWarning(err.error.message);
          Swal.fire(
            err.error.message
          )
        },()=>{
          Swal.fire(
            'Canceled!',
            'Cancel Successfully',
            'success'
          )
          this.router.navigate(['shop/order/order-history']);
        });
      }
    })
  }
}

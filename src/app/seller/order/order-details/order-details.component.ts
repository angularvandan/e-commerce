import { Component } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {

  products:any[]=[];
  deliveryFee:number=0;
  totalProducts:number=0;
  totalPrice:number=0;
  totalDiscount:number=0;

  orderId!:string;
  showBigImage: any;
  productImage:any[]=[];
  orderAddress:any;
  cancelStatus:boolean=false;
  dispatchStatus:boolean=false;
  deliverStatus:boolean=false;


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
      console.log(response[0]);
      this.products=response[0].items;
      this.totalProducts=this.products.length;
      this.deliveryFee=response[0].deliveryFee;
      this.orderAddress=response[0].address;
      if(response[0].status=='Cancelled'){
        this.cancelStatus=true;
        this.dispatchStatus=true;
        this.deliverStatus=true;
      }
      else if(response[0].status=='Dispatched'){
        this.cancelStatus=false;
        this.dispatchStatus=true;
        this.deliverStatus=false;
      }
      else if(response[0].status=='Delivered'){
        this.deliverStatus=true;
        this.cancelStatus=true;
        this.dispatchStatus=true;
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
      // console.log(product.productId);
      this.httpService.getProduct(product.productId).subscribe((response:any)=>{
        console.log(response);
        this.productImage.push(response.images[0].url);
      },err=>{
        console.log(err);
      });
    }
  }
  onTotalPrice(){
    this.totalPrice=0;
    for(let product of this.products){
      this.totalPrice+=product.price;
      this.totalDiscount+=product.subTotal;
    }
    this.totalDiscount=this.totalPrice-this.totalDiscount;
  }
  onCancel(){
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
        this.httpService.orderActions('cancel',this.orderId).subscribe((response:any)=>{
          console.log(response);
        },err=>{
          console.log(err.error.message);
          Swal.fire(
            err.error.message
          )
        },()=>{
          Swal.fire(
            'Canceled!',
            'Cancel Successfully',
            'success'
          )
          this.router.navigate(['order/order-list']);
        })
      }
    })
  }
  onDispatch(){
    this.httpService.orderActions('dispatch',this.orderId).subscribe((response:any)=>{
      console.log(response);
    },err=>{
      console.log(err.error.message);
    },()=>{
      this.userService.showSuccess('Dispatched Successfully');
      this.router.navigate(['order/order-list']);
    })
  }
  onDelivered(){
    this.httpService.orderActions('deliver',this.orderId).subscribe((response:any)=>{
      console.log(response);
    },err=>{
      console.log(err.error.message);
    },()=>{
      this.userService.showSuccess('Delivered Successfully');
      this.router.navigate(['order/order-list']);
    })
  }
}

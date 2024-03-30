import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { OrderState } from '../state/order.state';
import { addLocalToState, cancelProduct, updateCount } from '../state/order.actions';
import { getProducts } from '../state/order.selector';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  productId:any;
  showBigImage: any;
  count!:number;
  totalItems!:any;
  products:any[]=[];
  totalProducts!:number;
  totalPrice:number=0;
  totalDiscount:number=0;
  checkAddressLogin:boolean=true;

  constructor(private httpService:HttpService,private userService:UserService,
    private store:Store<OrderState>,
    private router:Router){}
  
  ngOnInit(): void {
    this.getAllProductFormStore();
  }
  getAllProductFormStore(){
    this.store.dispatch(addLocalToState());
    this.store.select(getProducts).subscribe(res=>{
      console.log(res,"From Res");
      this.products=res;
    });
    this.totalProducts=this.products?.length;
    this.getTotalPrice();
  }
  getTotalPrice(){
    this.totalPrice=0;
    this.totalDiscount=0;
    this.store.select(getProducts)?.subscribe(res=>{
      this.products=res;
      console.log(this.products);
    })
    for(let product of this.products){
      // console.log(product.price);
      this.totalPrice+=(product.totalPrice);
      console.log(product.totalPrice);
    }
    //this is for discount
    for(let product of this.products){
      this.totalDiscount+=product.price*product.count;
    }
    this.totalDiscount=this.totalDiscount-this.totalPrice;
    this.totalDiscount=Number(this.totalDiscount.toFixed(2));

    this.totalPrice=Number(this.totalPrice.toFixed(2));
    console.log(this.totalPrice);
    this.totalProducts=this.products.length;
  }
  onSmallImageClick(image:any){
    this.showBigImage=image?.url;
  }

  countItem(id:any,value:any){
    if(value>=1){
      console.log('index');
      let payload={
        id,
        count:value
      };
      this.store.dispatch(updateCount({payload}));
      this.getAllProductFormStore();
      this.getTotalPrice();
    }
    else{
      window.alert('One item must be selected');
      let payload={
        id,
        count:1
      }
      this.store.dispatch(updateCount({payload}));
      this.store.select(getProducts).subscribe(res=>{
        this.products=res;
      });
      this.getTotalPrice();
    }
  }
  onCheckout(){
    console.log('onCheckout')
    this.userService.getSelf().then((res) => {
      if(res){
        this.checkAddressLogin=false;
        this.httpService.getSavedAddress().subscribe((response:any)=>{
          if(response.length!=0){
            // console.log(response);
            this.router.navigate(['shop/order/create-order']);
          }
          else{
            console.log(response);
            this.router.navigate(['shop/customer/add-address']);
          }
        },err=>{
          console.log(err);
          this.checkAddressLogin=true;
        },()=>{
          this.checkAddressLogin=true;
        });
      }
    }).catch((err) => {
      console.log(err);
      this.router.navigate(['shop/auth/login']);
    });
  }
  onCancel(id:string){
    this.store.dispatch(cancelProduct({id}));
    this.getAllProductFormStore();
    this.getTotalPrice();
    let cartCount=JSON.parse(localStorage.getItem('products')||'[]');
    this.userService.cartCount.next(cartCount.length);
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { OrderState } from '../../order/state/order.state';
import { addLocalToState } from '../../order/state/order.actions';
import { getProducts } from '../../order/state/order.selector';


export interface productType{
  page:number,
  limit:number,
  sortBy?:string,
  name?:string
}
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products:any[]=[];
  page:number=1;
  limit:number=8;
  totalProducts!:number;
  sortBy:string='';
  name:string='';
  product!:any;

  productPerms:productType={
    page:this.page,
    limit:this.limit
  }

  constructor(private httpService:HttpService,private userService:UserService,
    private router:Router){
  }

  ngOnInit(): void {
    // for hide product 
    var ele: any = document.querySelector('.grecaptcha-badge');
      // console.log(ele);
      if(ele!=null){
        ele.style.display = 'none';
      }
    this.onGetAllProducts();
    // this.cartCount();
  }
  onGetAllProducts(){
    this.httpService.getAllProducts(this.productPerms).subscribe((response:any)=>{
      // console.log(response);
      this.products=response.results;
      this.totalProducts=response.totalResults;
    },err=>{
      console.log(err.error.message);
    });
  }
  pageChanged(page:any){
    this.page=page;
    this.productPerms.page=page;
    this.onGetAllProducts();
  }
  onLimit(){
    this.productPerms.limit=this.limit;
    this.onGetAllProducts();
  }
  onSortBy(){
    if(this.sortBy!=''){
      this.productPerms.sortBy=this.sortBy;
      this.onGetAllProducts();
    }
    else{
      delete this.productPerms.sortBy;
      this.onGetAllProducts();
    }
  }
  onSortByName(){
    if(this.name!=''){
      this.page=1;
      this.productPerms.name=this.name;
      this.productPerms.page=this.page;
      delete this.productPerms.sortBy;
      this.name='';
      this.onGetAllProducts();
    }
    else{
      this.sortBy='';
      delete this.productPerms.name;
      delete this.productPerms.sortBy;
      this.onGetAllProducts();
    }
  }
  onViewProduct(id:any){
    this.router.navigate(['shop/products/view-product'],{queryParams:{id:id}});
  }
  onAddCart(id:any){
    this.onGetProduct(id);
  }
  onGetProduct(productId:any){
    this.httpService.getProduct(productId).subscribe((response:any)=>{
      console.log(response);
      this.product=response;
    },err=>{
      console.log(err.error.message);
    },()=>{
      let products=JSON.parse(localStorage.getItem('products')||'[]');
      console.log(products);
      let productByLocal=[];
      if(products.length>=0){
        for(let product of products){
          productByLocal.push(product);
        }
        productByLocal.push({...this.product,count:1,totalPrice:this.product.price});
        localStorage.setItem('products',JSON.stringify(productByLocal));
        this.userService.showSuccess('Product has been added to cart');
      }
      else{
        localStorage.clear();
        this.userService.showWarning('Some problem occur');
      }
      //this is for update cart count on navbar
      this.cartCount();
    })
  }
  cartCount(){
    let cartItems=JSON.parse(localStorage.getItem('products')||'[]');
    this.userService.cartCount.next(cartItems.length);
  }
}

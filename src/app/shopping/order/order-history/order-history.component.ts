import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { Route, Router } from '@angular/router';
import { UserService } from '../../service/user.service';

export interface productType{
  page:number,
  limit:number,
  sortBy?:string,
  name?:string
}

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit{

  products:any[]=[];

  page:number=1;
  limit:number=10;
  sortBy:string='';
  name:string='';
  totalProducts:number=0;
  productPerms:productType={
    page:this.page,
    limit:this.limit
  }

  constructor(private httpService:HttpService,private router:Router,private userService:UserService){}

  ngOnInit(): void {
    this.onGetAllOrderHistory();
  }
  onGetAllOrderHistory(){
    this.httpService.orderHistory(this.productPerms).subscribe((response:any)=>{
      console.log(response);
      console.log(response.results[0].createdAt);
      this.products=response.results;
      this.totalProducts=response.totalResults;
    },err=>{
      console.log(err.error.message);
      this.userService.showWarning(err.error.message);
    });
  }
  onShowProductDetails(productId:string){
    this.router.navigate(['shop/order/order-details'],{queryParams:{id:productId}});
  }
  onLimit(){
    this.productPerms.limit=this.limit;
    this.onGetAllOrderHistory();
  }
  onSortOption(){
    this.productPerms.sortBy=this.sortBy;
    this.onGetAllOrderHistory();
  }
  pageChanged(page:any){
    this.page=page;
    this.productPerms.page=page;
    this.onGetAllOrderHistory();
  }
}

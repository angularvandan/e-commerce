import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { Router } from '@angular/router';

export interface productType{
  page:number,
  limit:number,
  sortBy?:string,
  name?:string
}
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit{

  products:any[]=[];
  page:number=1;
  limit:number=5;
  sortBy:string='';
  name:string='';
  totalProducts:number=0;
  productPerms:productType={
    page:this.page,
    limit:this.limit
  }

  constructor(private httpService:HttpService,private router:Router){}
  ngOnInit(): void {
    this.onOrderList();
  }
  onOrderList(){
    this.httpService.orderList(this.productPerms).subscribe((response:any)=>{
      console.log(response);
      this.products=response.results;
      this.totalProducts=response.totalResults;
    },err=>{
      console.log(err);
    });
  }
  onShowProductDetails(productId:string){
    this.router.navigate(['order/order-details'],{queryParams:{id:productId}});
  }
  onLimit(){
    this.productPerms.limit=this.limit;
    this.onOrderList();
  }
  onSortOption(){
    this.productPerms.sortBy=this.sortBy;
    this.onOrderList();
  }
  pageChanged(page:any){
    this.page=page;
    this.productPerms.page=page;
    this.onOrderList();
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit{

  productId:any;
  product:any;
  showBigImage: any;
  constructor(private httpService:HttpService,private activatedRoute:ActivatedRoute,
  private userService:UserService){}


  ngOnInit(): void {
    // setTimeout(()=>{
      this.activatedRoute.queryParamMap.subscribe((response:any)=>{
        this.productId=response.get('id');
        this.onGetProduct();
      });
    // },10)
    // console.log('')
    
  }
  onGetProduct(){
    console.log(this.productId)
    this.httpService.getProduct(this.productId).subscribe((response:any)=>{
      console.log(response);
      this.product=response;
      this.showBigImage=this.product?.images[0]?.url;
    },err=>{
      console.log(err.error.message);
    },()=>{
    })
  }
  onSmallImageClick(image:any){
    this.showBigImage=image?.url;
  }
}

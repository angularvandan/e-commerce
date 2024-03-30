import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit{

  reactiveForm!:FormGroup;
  productId:any;
  product:any;
  viewStatus:boolean=false;
  showBigImage:any;

  bigImageId!:any;
  images:any[]=[];
  deleteImageId:any;
  @ViewChild('file')ele!:ElementRef;

  constructor(private http:HttpService, private userService:UserService,private activatedRoute:ActivatedRoute){
  }
  ngOnInit(): void {
    this.reactiveForm=new FormGroup({
      name:new FormControl(null,Validators.required),
      description:new FormControl(null),
      images:new FormControl(null),
      price:new FormControl(null),
    })
    this.reactiveForm.disable();
    setTimeout(()=>{
      this.activatedRoute.queryParamMap.subscribe((response:any)=>{
        this.productId=response.get('id');
      });
      this.onGetProduct();
    },10);
  }
  onGetProduct(){
    this.http.getProduct(this.productId).subscribe((response)=>{
      console.log(response);
      this.product=response;
      // below code for first load 
      this.showBigImage=this.product?.images[0]?.url;
      this.bigImageId=this.product?.images[0]?.public_id;
    },err=>{
      console.log(err.error.message);
    },()=>{
      this.viewStatus=true;

    })
  }
  onShowBigImage(image:any){
    this.showBigImage=image.url;
    this.bigImageId=image.public_id;
  }

  onFile(files:any){
    let images=files.target.files;
    console.log(files.target.files);
    for(let image of images){
      this.images.push(image);
    }
  }

  //confirm:any;
  onAddAndDeleteImages(){
    let confirm=window.confirm('Do you want to add or delete ?');
    
    if(confirm){
      const formData = new FormData();
      let check:any=document.querySelectorAll("input[type='checkbox']:checked");
      for(let img of check){
        formData.append('delete',img.value);
      }
      for(let image of this.images){
        formData.append("new_images",image);
      }
      // console.log(formData.has('delete')||formData.has('new_images'))
      if(formData.has('delete')||formData.has('new_images')){
        this.http.updateImage(formData,this.productId).subscribe((response:any)=>{
          console.log(response);
        },err=>{
          console.log(err.error.message);
        },()=>{
          this.userService.showSuccess('Image Added and Deleted Successfully');
          this.images=[];
          this.onGetProduct();
        });
      }else{
        this.userService.showWarning('Delete or add minimum one image !');
      }
    }
  }
  onResetInputField(){
    this.ele.nativeElement.value="";
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { Editor } from 'ngx-editor';
import { toHTML } from 'ngx-editor';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit,OnDestroy{

  reactiveForm!:FormGroup;
  images:File[]=[];
  files: File[] = [];
  editor!: Editor;
  html!:any;


  constructor(private http:HttpService,private userService:UserService,private router:Router){}

  ngOnInit(): void {

    this.editor = new Editor();
    this.reactiveForm=new FormGroup({
      name:new FormControl(null,Validators.required),
      description:new FormControl(null,Validators.required),
      // images:new FormControl(null,Validators.required),
      price:new FormControl(null,[Validators.required,Validators.pattern('^[0-9]*[0-9]$')]),
    })
  }
  ngOnDestroy(): void {
    if(this.editor!=undefined){
      this.editor.destroy();
    }
  }
  onCreateProduct(){
    console.log(this.reactiveForm);
    //this is form to convert doc into html
    let jsonDoc=this.reactiveForm.get('description')?.value;
    console.log("converted value to html",jsonDoc)
    const html = toHTML(jsonDoc);
    // console.log(html);
    this.html=html;
    const formData = new FormData();
    formData.append("name",this.reactiveForm.get('name')?.value);
    formData.append("description",this.html);
    
    for(let image of this.files){
      formData.append("images",image);
    }
    formData.append("price",this.reactiveForm.get('price')?.value);
      
    this.http.createProducts(formData).subscribe((res:any)=>{
      console.log(res);
    },err=>{
      this.userService.showWarning(err.error.message);
    },()=>{
      this.userService.showSuccess('Created Successfully');
      this.router.navigate(['products/product-list']);
    });
  }
  // onFile(files:any){
  //   console.log(files.target.files);
  //   this.images.push(...files.target.files);
  // }

  onSelect(event:any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}

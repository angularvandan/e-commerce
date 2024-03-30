import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageCroppedEvent, LoadedImage, base64ToFile } from 'ngx-image-cropper';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-self',
  templateUrl: './self.component.html',
  styleUrls: ['./self.component.css']
})
export class SelfComponent implements OnInit{
  user:any;
  image:any;
  reactiveForm!:FormGroup;
  editProfileStatus:boolean=true;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageName:any;


  constructor(private httpService:HttpService,private userService:UserService,
    private router:Router){
  }
  ngOnInit(): void {
    this.getSelf();
    this.reactiveForm=new FormGroup({
      name:new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.required,Validators.email]),
    });
    this.reactiveForm.disable();
    //for hide th recaptcha
    var ele: any = document.querySelector('.grecaptcha-badge');
      // console.log(ele);
      if(ele!=null){
        ele.style.display = 'none';
      }
  }
  getSelf(){
    this.httpService.self().subscribe((response:any)=>{
      console.log(response);
      this.user=response;
    },err=>{
    });
  }
  onUpdateImage(){
    const formData=new FormData();
    console.log(this.image);
    formData.append('picture',this.image);
    this.httpService.updateProfilePicture(formData).subscribe((response:any)=>{
      console.log(response);
    },err=>{
      // console.log(err.error.message);
      this.userService.showWarning(err.error.message);
    },()=>{
      this.userService.showSuccess('Successfully updated');
      this.getSelf();
    });
  }
  onDeleteImage(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpService.deleteProfilePicture().subscribe((response:any)=>{
          console.log(response);
        },err=>{
          // console.log(err.error.message);
          // this.userService.showWarning(err.error.message);
          Swal.fire(
            err.error.message
          )
        },()=>{
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.getSelf();
        });
      }
    })
  }
  // onFile(image:any){
  //   // console.log(image.target.files[0]);
  //   this.image=image.target.files[0];
  // }
  onEditProfile(){
    this.reactiveForm.enable();
    this.editProfileStatus=false;
    document.getElementById('name')?.focus();
    this.reactiveForm.patchValue({
      name:this.user?.name,
      email:this.user?.email
    });
  }
  onCancel(){
    this.reactiveForm.disable();
    this.editProfileStatus=true;
  }
  onEditProfileSave(){
    console.log(this.reactiveForm.value);
    this.httpService.updateProfile(this.reactiveForm.value).subscribe((response:any)=>{
      console.log(response);
    },err=>{
      // console.log(err);
      this.userService.showWarning(err.error.message);
    },()=>{
      this.userService.showSuccess('Successfully Updated');
      this.reactiveForm.disable();
      this.editProfileStatus=true;
    });
  }
  onAddAddress(){
    this.router.navigate(['shop/customer/add-address']);
  }
  onGetAddress(){
    this.router.navigate(['shop/customer/get-address']);
  }
  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
      // console.log(this.imageChangedEvent);
      this.imageName=this.imageChangedEvent.target.files[0].name;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      // console.log(event);
      this.image = base64ToFile(this.croppedImage);
      // console.log(this.image);
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }
}

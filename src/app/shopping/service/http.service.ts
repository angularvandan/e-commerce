import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  token:any;
  headers: any;
  constructor(private http:HttpClient) {
    // console.log('hi');
    try{
      this.token=JSON.parse(<string>localStorage.getItem('CustomerToken'));
      this.headers=new HttpHeaders().set('Authorization',`bearer ${this.token}`)
    }catch(err){
      localStorage.removeItem('CustomerToken');
    }
  }
  getAllProducts(product:{}){
    return this.http.get('https://shop-api.ngminds.com/shop/products',{params:product});
  }
  getProduct(id:any){
    return this.http.get('https://shop-api.ngminds.com/shop/products/'+id);
  }
  register(user:{}){
    return this.http.post('https://shop-api.ngminds.com/shop/auth/register?captcha=false',user)
  }
  login(user:{}){
    return this.http.post('https://shop-api.ngminds.com/shop/auth/login?captcha=false',user)
  }
  self(){
    try{
      this.token=JSON.parse(<string>localStorage.getItem('CustomerToken'));
      this.headers=new HttpHeaders().set('Authorization',`bearer ${this.token}`)
    }catch(err){
      localStorage.removeItem('CustomerToken');
    }
    return this.http.get('https://shop-api.ngminds.com/shop/auth/self',{headers:this.headers})
  }
  updateProfile(user:{}){
    return this.http.patch('https://shop-api.ngminds.com/customers/update-profile',user,{headers:this.headers})
  }
  updateProfilePicture(image:any){
    try{
      this.token=JSON.parse(<string>localStorage.getItem('CustomerToken'));
      this.headers=new HttpHeaders().set('Authorization',`bearer ${this.token}`)
    }catch(err){
      localStorage.removeItem('CustomerToken');
    }
    return this.http.post('https://shop-api.ngminds.com/customers/profile-picture',image,{headers:this.headers});
  }
  deleteProfilePicture(){
    return this.http.delete('https://shop-api.ngminds.com/customers/profile-picture',{headers:this.headers})
  }
  getSavedAddress(){
    return this.http.get('https://shop-api.ngminds.com/customers/address',{headers:this.headers});
  }
  getAddressById(addressId:any){
    return this.http.get('https://shop-api.ngminds.com/customers/address/'+addressId,{headers:this.headers});
  }
  addAddress(address:{}){
    return this.http.post('https://shop-api.ngminds.com/customers/address',address,{headers:this.headers})
  }
  updateAddress(address:{},addressId:any){
    return this.http.put('https://shop-api.ngminds.com/customers/address/'+addressId,address,{headers:this.headers})
  }
  deleteAddress(addressId:any){
    return this.http.delete('https://shop-api.ngminds.com/customers/address/'+addressId,{headers:this.headers});
  }

  changePassword(password:{}){
    return this.http.post('https://shop-api.ngminds.com/customers/auth/change-password',password,{headers:this.headers})
  }
  removeAccount(){
    return this.http.delete('https://shop-api.ngminds.com/customers/account',{headers:this.headers})
  }
  //order
  createOrder(data:any){
    return this.http.post('https://shop-api.ngminds.com/shop/orders',data,{headers:this.headers});
  }
  confirmOrder(details:{},orderId:any){
    return this.http.put('https://shop-api.ngminds.com/shop/orders/confirm/'+orderId,details,{headers:this.headers})
  }
  orderHistory(data:{}){
    return this.http.get('https://shop-api.ngminds.com/shop/orders',{headers:this.headers,params:data})
  }
  orderDetails(orderId:string){
    return this.http.get('https://shop-api.ngminds.com/shop/orders/'+orderId,{headers:this.headers})
  }
  cancelOrder(orderId:string){
    return this.http.patch('https://shop-api.ngminds.com/shop/orders/cancel/'+orderId,{},{headers:this.headers})
  }
}

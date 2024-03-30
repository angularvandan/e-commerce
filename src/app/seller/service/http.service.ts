import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Register } from '../auth/Model/register';
import { Login } from '../auth/Model/login';
import { Subject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService{

  error=new Subject<string>();
  token!:any;
  headers!:any;

  constructor(private http:HttpClient) {
    try{
      this.token=JSON.parse(<string>localStorage.getItem('token1'));
      this.headers=new HttpHeaders().set('Authorization',`bearer ${this.token}`)
    }catch(err){
      localStorage.removeItem('token1');
    }
  }
  createRegister(register:Register){
    return this.http.post('https://shop-api.ngminds.com/auth/register?captcha=false',register);
  }
  createLogin(login:Login){
    return this.http.post('https://shop-api.ngminds.com/auth/login?captcha=false',login)
    // .pipe(catchError((err)=>{
    //   return throwError(err);
    // }));
  }
  fetchUserDetails(){
    //below two line for first load
    this.token=JSON.parse(<string>localStorage.getItem('token1'));
    this.headers=new HttpHeaders().set('Authorization',`bearer ${this.token}`);
    return this.http.get('https://shop-api.ngminds.com/auth/self',{headers:this.headers})
    // .pipe(catchError((err)=>{
    //   return throwError(err);
    // }));
  }
  updateUserCompanyDetails(user:{name:string}){
    return this.http.patch('https://shop-api.ngminds.com/users/org',user,{headers:this.headers})
    // .pipe(catchError((err)=>{
    //   return throwError(err);
    // }));
  }
  createUser(user:{email:string,password:string,name:string,role:string}){
    return this.http.post('https://shop-api.ngminds.com/users ',user,{headers:this.headers})
    // .pipe(catchError((err)=>{
    //   return throwError(err);
    // }));
  }
  getUsers(user:{}){
    return this.http.get('https://shop-api.ngminds.com/users',{headers:this.headers,params:user});
  }
  deleteUser(userId:string){
    return this.http.delete('https://shop-api.ngminds.com/users/'+userId,{headers:this.headers});
  }
  updateUserDetails(userId:string,user:{email:string,password:string,name:string}){
    return this.http.patch('https://shop-api.ngminds.com/users/'+userId,user,{headers:this.headers})
    // .pipe(catchError((err)=>{
    //   return throwError(err);
    // }));
  }
  updateUserRole(userId:string,user:{role:string}){
    return this.http.patch('https://shop-api.ngminds.com/users/role/'+userId,user,{headers:this.headers})
    // .pipe(catchError((err)=>{
    //   return throwError(err);
    // }));
  }
  changePassword(user:{}){
    return this.http.post('https://shop-api.ngminds.com/users/auth/change-password',user,{headers:this.headers})
    // .pipe(catchError((err)=>{
    //   return throwError(err);
    // }))
  }
  resetPassword(password:string,token:any){
    const payload = {
      password:password
    }
    return this.http.post('https://shop-api.ngminds.com/auth/reset-password?token='+token,payload)
    // .pipe(catchError((err)=>{
    //   return throwError(err);
    // }))
  }
  forgotPassword(user:{}){
    return this.http.post('https://shop-api.ngminds.com/auth/forgot-password',user)
    // .pipe(catchError((err)=>{
    //   return throwError(err);
    // }))
  }
  verifyEmail(){
    return this.http.post('https://shop-api.ngminds.com/auth/send-verification-email',{},{headers:this.headers})
    // .pipe(catchError((err)=>{
    //     return throwError(err);
    // }))
  }
  verifyAccount(token:any){
    return this.http.post('https://shop-api.ngminds.com/auth/verify-email?token='+token,{})
    // .pipe(catchError((err)=>{
    //   return throwError(err);
    // }));
  }
  googleSignIn(user:{}){
    return this.http.post('https://shop-api.ngminds.com/auth/login/google',user)
    // .pipe(catchError((err)=>{
    //   return throwError(err);
    // }))
  }
  getAdminId(){
    return this.fetchUserDetails();
  }

//products
  createProducts(product:any){
    console.log(product);
    this.token=JSON.parse(<string>localStorage.getItem('token1'));
    this.headers=new HttpHeaders().set('Authorization',`bearer ${this.token}`)
    // .set( 'Content-Type', 'multipart/form-data');
    return this.http.post('https://shop-api.ngminds.com/products',product,{headers:this.headers})
    // .pipe(catchError((err)=>{
    //   return throwError(err);
    // }))
  }
  getProducts(product:{}){
    return this.http.get('https://shop-api.ngminds.com/products',{headers:this.headers,params:product})
  }
  getProduct(id:any){
    return this.http.get('https://shop-api.ngminds.com/products/'+id,{headers:this.headers});
  }
  updateImage(product:{},id:any){
    this.token=JSON.parse(<string>localStorage.getItem('token1'));
    this.headers=new HttpHeaders().set('Authorization',`bearer ${this.token}`)
    // .set( 'Content-Type', 'multipart/form-data');
    return this.http.patch('https://shop-api.ngminds.com/products/images/'+id,product,{headers:this.headers})
  }
  updateProducts(product:{},id:any){
    return this.http.patch('https://shop-api.ngminds.com/products/'+id,product,{headers:this.headers})
  }
  deleteProduct(id:any){
    return this.http.delete('https://shop-api.ngminds.com/products/'+id,{headers:this.headers})
  }
  //order seller
  orderList(sort:{}){
    return this.http.get('https://shop-api.ngminds.com/orders',{headers:this.headers,params:sort});
  }
  orderDetails(orderId:string){
    return this.http.get('https://shop-api.ngminds.com/orders/'+orderId,{headers:this.headers});
  }
  orderActions(action:string,orderId:string){
    return this.http.patch('https://shop-api.ngminds.com/orders/'+action+'/'+orderId,{},{headers:this.headers});
  }
}

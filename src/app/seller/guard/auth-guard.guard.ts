import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../service/http.service';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router,private userService:UserService) { }
  canActivate(route?: ActivatedRouteSnapshot,
    state?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    return this.userService.getProfile().then((res:any)=>{
      this.userService.nav.next(false);
      return res;
    }).catch((err)=>{
      console.log(err);
      localStorage.removeItem('token1');
      this.userService.nav.next(true);
      this.router.navigate(['auth/login']);
      return false;
    });   
  }
}

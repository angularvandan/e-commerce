import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private router: Router,
    private userService: UserService) { }
  canActivate(
    route?: ActivatedRouteSnapshot,
    state?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.userService.getSelf().then((res) => {
      this.userService.loginRegisterStatus.next(true);
      return res;
    }).catch((err) => {
      this.router.navigate(['shop/auth/login']);
      return false;
    });
  }
}

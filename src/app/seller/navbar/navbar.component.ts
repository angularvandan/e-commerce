import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  navStatus:boolean=false;
  constructor(private userService:UserService,private router:Router){
    userService.nav.subscribe((res:any)=>{
      this.navStatus=res;
      console.log(res);
    });
  }
  onLogOut(){
    localStorage.removeItem('token1');
    this.router.navigate(['auth/login']);
    this.userService.nav.next(true);
  }
}

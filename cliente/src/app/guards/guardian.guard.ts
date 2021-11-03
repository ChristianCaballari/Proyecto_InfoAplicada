import { LoginService } from 'src/app/servicios/login.service';
import { Injectable } from '@angular/core';
import {  CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GuardianGuard implements CanActivate {

  constructor(private loginService:LoginService,private router:Router){

  }
  canActivate(): Observable<boolean> {
      console.log("No logueado", this.loginService.loggedIn.value);
     if(!this.loginService.loggedIn.value){
       this.router.navigate(['/login']);
     }     
  return this.loginService.loggedIn;     
  }
}
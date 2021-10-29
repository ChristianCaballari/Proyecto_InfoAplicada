import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggin: boolean = false;
  loggerUser: string = '';


  constructor(private loginService:LoginService,
           private  Routerer: Router) {}

  ngOnInit(): void {
    console.log("Esta o no esta");
     console.log(this.loginService.getAutenicacion());
     console.log("Esta o no esta");
    if(this.loginService.getAutenicacion() != ''){
      this.isLoggin = true;
      this.loggerUser = this.loginService.getAutenicacion();
    }else{
      this.isLoggin = false;
    }
  }
  logout(){
    this.loginService.logout();
    this.isLoggin = false;
    this.Routerer.navigate(['/login']);
  }
}

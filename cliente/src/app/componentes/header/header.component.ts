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
  nombreUser: any;
  imgUser:any;

  constructor(private loginService:LoginService,
  private  Routerer: Router) {}

  ngOnInit(): void {
   this.nombreUser = localStorage.getItem("loginName")?.toString();
   this.imgUser = localStorage.getItem("foto")?.toString();
   console.log(this.nombreUser);
  }
  logout(){
    this.loginService.logout();
    this.isLoggin = false;
    this.Routerer.navigate(['/login']);
  }
}

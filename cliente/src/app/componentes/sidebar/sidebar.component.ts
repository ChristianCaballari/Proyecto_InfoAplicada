import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public loginService:LoginService,
    private router: Router) { }
  
    ngOnInit(): void {
    }
    logout(){
      this.loginService.logout();
      this.router.navigate(['/login']);  
    }
}

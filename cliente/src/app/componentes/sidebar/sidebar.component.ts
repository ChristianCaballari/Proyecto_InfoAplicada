import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild('botonCerrarHeader') botonCerrarHeader: ElementRef;
  constructor(public loginService:LoginService,
    private router: Router) { }
  
    ngOnInit(): void {
    }
    logout(){
      this.loginService.logout();
      this.router.navigate(['/login']);  
    }
    cerrarSidebar(){
      this.botonCerrarHeader.nativeElement.click();
     }
}

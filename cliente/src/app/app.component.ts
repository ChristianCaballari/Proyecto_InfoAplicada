import { Component } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cliente';

  constructor(public loginService :LoginService){

  }
}

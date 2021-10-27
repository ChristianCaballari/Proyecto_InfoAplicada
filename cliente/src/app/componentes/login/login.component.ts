
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
 // loginName: string = '';

  constructor(private router: Router,
              private flashMessages: FlashMessagesService,
              private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login(){

    if(this.email != '' && this.password != ''){

     this.loginService.login(this.email,this.password).then(rest =>{
         
      console.log(Object.keys(rest).length);

        if(Object.keys(rest).length === 1){
          this.flashMessages.show("Datos Incorrectos",{
            cssClass: 'alert-danger', timeout: 4000
          });
        }else{
          //loginName = Object.values(rest)[0]; 
          this.router.navigate(['/']);
        }     
     });
    }else{
      this.flashMessages.show("Correo o Contraseña Incorrecta",{
        cssClass: 'alert-danger', timeout: 4000
      });
    }
  }
}
    /*if(this.loginService.login(this.email,this.password)){
      this.router.navigate(['/']);
    }else{
      this.flashMessages.show("Correo o Contraseña Incorrecta",{
        cssClass: 'alert-danger', timeout: 4000
      });
    }
  }*/
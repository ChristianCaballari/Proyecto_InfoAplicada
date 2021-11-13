import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { ILogin } from './../../modelo/login.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
//import { Subscription } from 'rxjs';
import { Swal2 } from 'src/app/mensajes/mensajes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
 // private subscripcion: Subscription;
  funcionario: ILogin = {
    loginName: '',
    password: '',
  };
  @ViewChild('funcionarioLogin') funcionarioLogin: NgForm;

  constructor(private loginService: LoginService, private router: Router, private swal:Swal2 ) {}
  ngOnInit(): void {}
  // ngOnDestroy(): void {
  //   this.subscripcion.unsubscribe();
  // }

  login(funcionarioLogin: NgForm) {
    if (funcionarioLogin.valid) {
      console.log("Hola");
    //  this.subscripcion.add(
        this.loginService.login2(this.funcionario).subscribe((res) => {
            
         if (Object(res)['noValido'] == 'No') {
            this.swal.error(Object(res)['msg']);
         }else{
          this.swal.exitoso("Bienvenido al Sistema");
           this.router.navigate(['/home']);
         }
        })
    //  );
    }
  }
}

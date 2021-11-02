
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionarioLogin } from 'src/app/modelo/Funcionario.model';
import { LoginService } from 'src/app/servicios/login.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
//@sweetalert2/theme-dark


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  funcionario: FuncionarioLogin = {
    loginName: '',
    password: '',     
};

  @ViewChild("funcionarioLogin") funcionarioLogin: NgForm;

  constructor(private router: Router,
             
              private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login(funcionarioLogin: NgForm){
    if(funcionarioLogin.valid){

     
      let loginName=funcionarioLogin.value['loginName'];
      let password= funcionarioLogin.value['password'];

      console.log(funcionarioLogin.value);
     
     
      this.loginService.login(loginName,password).then(rest =>{
        console.log(Object.keys(rest).length);
        console.log(rest);
        if(Object.keys(rest).length==1){
          Swal.fire({
            title:'Usuario no existe',
            position: 'top-end',
            icon:'warning',
            showConfirmButton: false,
            timer: 2000
            }
            )
        }else{
          this.router.navigate(['/home']);
          Swal.fire({
            title:'Bienvenido',
            position: 'top-end',
            icon:'success',
            showConfirmButton: false,
            timer: 2000
            }
            )
        }
      });   
         // this.router.navigate(['/home'])
    }else{
      Swal.fire({
        title:'Campos obligatorios',
        position: 'top-end',
        icon:'warning',
        showConfirmButton: false,
        timer: 2000
        }
        )
    }
  }
}
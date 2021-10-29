
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
      let password= funcionarioLogin.value['password']
     
     
      this.loginService.login(loginName,password).then(rest =>{
        console.log(Object.keys(rest).length);
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
        }
      });

     
         // this.router.navigate(['/home']);

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

  /*login(){

    if(this.email != '' && this.password != ''){

     this.loginService.login(this.email,this.password).then(rest =>{
         
      console.log(Object.keys(rest).length);

        if(Object.keys(rest).length === 1){
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Datos Incorrectos',
            showConfirmButton: false,
            timer: 2500
          })
        }else{
          //loginName = Object.values(rest)[0]; 
          this.router.navigate(['/home']);
        }     
     });
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Todos los campos son obligatorios',
        showConfirmButton: false,
        timer: 3500
      })
      
    }
  }*/
}
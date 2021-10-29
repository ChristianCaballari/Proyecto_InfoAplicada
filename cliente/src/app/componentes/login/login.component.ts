
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import Swal from 'sweetalert2'
//@sweetalert2/theme-dark


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
             
              private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login(){

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
  }
}
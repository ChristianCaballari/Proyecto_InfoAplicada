import { Injectable } from "@angular/core";
import clienteAxios from "../componentes/ClienteAxios/Axios";
@Injectable()
export class LoginService{
     valid: Boolean = false;
     constructor(){

     }

     login(email:string, password: string){
         
       if(email === 'christianccm17@gmail.com' && password === '123'){
          this.valid = true;;
       }
       return this.valid;
     }
}
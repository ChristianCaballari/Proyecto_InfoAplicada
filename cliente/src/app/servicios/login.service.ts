import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import clienteAxios from "../componentes/ClienteAxios/Axios";
import axios from "axios";
@Injectable()
export class LoginService{
     valid: Boolean = false;

     constructor(){
    
     };

   async  login(email:string, password: string){
         
       let funcionario;
       let fun = {};

      // console.log(email);
      // console.log(password);

     
     
       try {
         let rest = await clienteAxios.get(`funcionario/consultar/${email}/${password}`);

        

         console.log("Holakkkk");
         console.log(rest.data);
         console.log("Holakkkk");

         let obj = (rest.data[0]['loginName']);
         let pas = (rest.data[0]['password']);
         console.log(obj);
         console.log(pas);
         


         funcionario = rest.data[0];
         fun = funcionario;

        // console.log(fun);

       } catch (error) {
         
  
      }
       return fun;
     }
}
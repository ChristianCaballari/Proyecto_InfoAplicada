import { Injectable } from '@angular/core';;
import { Funcionario1 } from '../modelo/Funcionario.model';

import clienteAxios from '../componentes/ClienteAxios/Axios';


@Injectable()
export class FuncionarioService{



    async getFuncionarios(){
       let rest = await clienteAxios.get('funcionario/obtenerFuncionarios');
      //console.log(rest.data);
      const datos = rest.data as Funcionario1;

     //  console.log(datos);
       return datos;
     }

}    
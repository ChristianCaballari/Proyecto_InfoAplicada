import { Injectable } from '@angular/core';;
import { Departamento} from '../modelo/Departamento.model';

import clienteAxios from '../componentes/ClienteAxios/Axios';


@Injectable()
export class DepartamentoService{


  async getDepartamentos(){
    let rest = await clienteAxios.get('departamento/consultar');
   //console.log(rest.data);
   const datos = rest.data as Departamento;
       
  //  console.log(datos);
    return datos;
  }

     

}    
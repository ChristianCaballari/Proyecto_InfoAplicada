import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environment';
import { Swal2 } from '../mensajes/mensajes';
;
import { Departamento} from '../modelo/Departamento.model';




@Injectable()
export class DepartamentoService{
  status: string;

  constructor(private http: HttpClient,
    private router: Router,
    private swal: Swal2) {}

    getAllDepartament() :Observable<Departamento>{
      return this.http.get<Departamento>(`${environment.API_URL}/departamento/consultar`)
      .pipe(
        map((response:Departamento) =>{
         return response;
        }),
        //catchError((error) =>this.hanlerError(error))
      );
    }

    deleteDepartament(dep: Departamento){
      return this.http.delete(`${environment.API_URL}/departamento/${dep.idDepartamento}`)
      .subscribe(() => this.status = 'Delete successful');
    }

    addDepartament(descripcion: string): Observable<Departamento>{
      return this.http.post(`${environment.API_URL}/departamento/`,descripcion)
    }

 /* async getDepartamentos(){
    let rest = await clienteAxios.get('departamento/consultar');
  
   const datos = rest.data as Departamento;
    
    return datos;
  }*/



     

}    
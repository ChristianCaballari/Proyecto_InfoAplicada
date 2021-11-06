import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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

    /*getAllDepartament() :Observable<Departamento>{//listo
      return this.http.get<Departamento>(`${environment.API_URL}/departamento/consultar`)
      .pipe(
        map((response:Departamento) =>{
         return response;
        }),
        //catchError((error) =>this.hanlerError(error))
      );
    }*/

    getAllDepartament() :Observable<Departamento>{//listo
      return this.http.get<Departamento>(`${environment.API_URL}/departamento/consultar`)
    
    }

    deleteDepartament(dep: Departamento){ //casi listo
      return this.http.delete(`${environment.API_URL}/departamento/${dep.idDepartamento}`)
      .subscribe(() => this.status = 'Delete successful');
    }

    addDepartament(dep: Departamento){//listo
    
      return this.http.post<Departamento>(`${environment.API_URL}/departamento/`,dep)
      .subscribe();
    }

    editDepartament(dep: Departamento){
      return this.http.put<Departamento>(`${environment.API_URL}/departamento/${dep.idDepartamento}`,dep);
    }





     

}    
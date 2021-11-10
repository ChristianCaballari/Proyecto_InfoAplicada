import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { map,catchError, tap } from 'rxjs/operators';
import { environment } from '../environment';
import { Swal2 } from '../mensajes/mensajes';
import { Departamento} from '../modelo/Departamento.model';




@Injectable()
export class DepartamentoService{
  status: string;
 private departamento: Departamento[];
  constructor(private http: HttpClient,
    private router: Router,

    private swal: Swal2) {}
    private _departamentos$ = new Subject<Departamento[]>();


    getAllDepartament() :Observable<Departamento[]>{//listo
      return this.http.get<Departamento[]>(`${environment.API_URL}/departamento/consultar`)
    }
    deleteDepartament(dep: Departamento):Observable<any>{ //casi listo
      return this.http.delete<Departamento>(`${environment.API_URL}/departamento/${dep.idDepartamento}`);
    }

    addDepartament(dep: Departamento):Observable<any>{//listo
          return this.http.post(`${environment.API_URL}/departamento/`,dep);
    }

    editDepartament(dep: Departamento){
      console.log(dep);
      return this.http.put<Departamento>(`${environment.API_URL}/departamento/editar/${dep.idDepartamento}`,dep);
    }
  

    private handlerError(error:any): Observable<never>{
      let errorMessage = 'An error ocurred retrienvin data';
      if(error){
        errorMessage = `Error: code ${error.message}`
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
    }
}    
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
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
    private _refresh$ = new Subject<void>();

    getAllDepartament() :Observable<Departamento[]>{//listo
      return this.http.get<Departamento[]>(`${environment.API_URL}/departamento/consultar`).pipe(map((res:Departamento[]) =>{
            return res;
      }),
      catchError(this.handlerError)
      )
    }

    deleteDepartament(dep: Departamento){ //casi listo
      console.log(dep);
      return this.http.delete(`${environment.API_URL}/departamento/${dep.idDepartamento}`)
      .subscribe(() => this.status = 'Delete successful');
    }

    addDepartament(dep: Departamento){//listo
    
      return this.http.post<Departamento>(`${environment.API_URL}/departamento/`,dep)
      .subscribe();
    }

    editDepartament(dep: Departamento){
      console.log(dep);
      return this.http.put<Departamento>(`${environment.API_URL}/departamento/editar/${dep.idDepartamento}`,dep).
      subscribe(()=> this.status = 'Actualizado');
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
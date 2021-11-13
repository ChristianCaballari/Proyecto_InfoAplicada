import { Funcionario2 } from 'src/app/modelo/Funcionario.model';
import { catchError, map } from 'rxjs/operators';
import { Observable,throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Funcionario1,Funcionario } from '../modelo/Funcionario.model';
import { HttpClient } from '@angular/common/http';
import clienteAxios from '../componentes/ClienteAxios/Axios';
import { environment } from '../environment';


@Injectable()
export class FuncionarioService{


  constructor(private http: HttpClient){

  }
     getAllFuncionarios():Observable<Funcionario1[]>{
      return this.http.get<Funcionario1[]>(`${environment.API_URL}/funcionario/obtenerFuncionarios`);
     }

    getById(funcionario:Funcionario):Observable<any>{
      return this.http.get(`${environment.API_URL}/funcionario/obtenerFuncionario/${funcionario.idFuncionario}`);
    }

    getByIdDetallesFuncionario(funcionario:Funcionario):Observable<any>{
      return this.http.get(`${environment.API_URL}/funcionario/obtenerFuncionarioDetalles/${funcionario.idFuncionario}`);
    }
    nuevoFuncionario(funcionario:Funcionario):Observable<any>{
      return this.http.post(`${environment.API_URL}/funcionario/`,funcionario)
    }

    updateFuncionario(funcionario:Funcionario):Observable<any>{
      return this.http.patch(`${environment.API_URL}/funcionario/editar`,funcionario);
    }
    delete(funcionario:Funcionario1):Observable<any>{
      return this.http.delete(`${environment.API_URL}/funcionario/${funcionario.idFuncionario}`);
    }

    getFuncionarioTI() :Observable<Funcionario2[]>{
      return this.http.get<Funcionario2[]>(`${environment.API_URL}/solicitud/consultar/TI`)
    }

    getFuncionarioSolicitud(funcionario1: Funcionario1) :Observable<Funcionario1[]>{
      return this.http.get<Funcionario1[]>(`${environment.API_URL}/solicitud/consultar/funcionario/${funcionario1.idFuncionario}`)
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
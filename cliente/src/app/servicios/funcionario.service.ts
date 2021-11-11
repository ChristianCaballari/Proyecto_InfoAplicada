import { catchError, map } from 'rxjs/operators';
import { Observable,throwError } from 'rxjs';
import { Injectable } from '@angular/core';;
import { Funcionario1 } from '../modelo/Funcionario.model';
import { Funcionario2 } from '../modelo/Funcionario.model';
import { HttpClient } from '@angular/common/http';
import clienteAxios from '../componentes/ClienteAxios/Axios';
import { environment } from '../environment';


@Injectable()
export class FuncionarioService{


  constructor(private http: HttpClient){

  }
    async getFuncionarios(){
       let rest = await clienteAxios.get('funcionario/obtenerFuncionarios');
      //console.log(rest.data);
      const datos = rest.data as Funcionario1;
          
      console.log(datos);
       return datos;
     }

     getAllFuncionarios():Observable<Funcionario1[]>{

      console.log("getAllFuncionarios");
      return this.http.get<Funcionario1[]>(`${environment.API_URL}/funcionario/obtenerFuncionarios`).pipe(
        map((res:Funcionario1[]) =>{
          //saveToke()
         // console.log(res);
         console.log("Holaassllalalal");
         console.log(res);
         console.log("Holaassllalalal");
           
          return res;
         }),
        
        catchError(this.handlerError)
      )
     }

    getById(funcionarioId:number):Observable<Funcionario1>{
      return this.http.get<Funcionario1>(`${environment.API_URL}/funcionario/${funcionarioId}`).pipe(catchError(this.handlerError));
    }
    nuevoFuncionario(funcionario:Funcionario1):Observable<Funcionario1>{
      return this.http.post<Funcionario1>(`${environment.API_URL}/funcionario/`,funcionario).pipe(catchError(this.handlerError));
    }

    updateFuncionario(funcionario:Funcionario1, idFuncionario:number):Observable<Funcionario1>{
      return this.http.patch<Funcionario1>(`${environment.API_URL}/funcionario/${idFuncionario}`,funcionario).pipe(catchError(this.handlerError));
    }

    delete(funcionarioId:number):Observable<Funcionario1>{
      return this.http.delete<Funcionario1>(`${environment.API_URL}/funcionario/${funcionarioId}`).pipe(catchError(this.handlerError));
    }

    getFuncionarioTI() :Observable<Funcionario2[]>{
      return this.http.get<Funcionario2[]>(`${environment.API_URL}/solicitud/consultar/TI`)
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

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { IResponse } from './../modelo/Respuesta.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '../modelo/login.model';
import { Router } from '@angular/router';
import {Swal2}  from '../mensajes/mensajes';
import { environment } from '../environment';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable()
export class LoginService {
 
   loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
    private router: Router,
    private swal: Swal2) {}

  login2(ilogin: ILogin): Observable<IResponse | void>{
   
    this.verificarToken();
 
    return this.http
    .post<IResponse>(`${environment.API_URL}/auth`,ilogin)
    .pipe(
      map((res:IResponse) =>{
        console.log(res);
       //saveToke()
      // console.log(res);
       if(res.noValido){
        console.log(res);
       }else{
       this.saveToken(res.token);
       this.saveIdUsuario(res.idFuncionario);
       this.saveNombreUsuario(res.loginName);
       this.saveFotoUsuario(res.foto);
       this.loggedIn.next(true);
       }
       
       return res;
      }),
      catchError((error) =>this.hanlerError(error))
    );
  }
  logout():void {
    localStorage.removeItem('token');
    localStorage.removeItem('loginName');
    localStorage.removeItem('idFuncionario');
    localStorage.removeItem('foto');
    this.loggedIn.next(false);
  }
  
  getIsLogged():Observable<boolean>{
  return this.loggedIn.asObservable();
  }

  private verificarToken(): void {
    const token = localStorage.getItem("token");
    const isExpired = helper.isTokenExpired(token?.toString());
    if(isExpired){
      this.logout();
    }else{
      this.loggedIn.next(true);
    }
    console.log("isExpired : "+isExpired);

  }

  private saveToken(token:string): void{
   localStorage.setItem('token', token);
  }
  private saveNombreUsuario(nombre:string): void{
    localStorage.setItem('loginName', nombre);
   }
  private saveIdUsuario(idFuncionario:string){
    localStorage.setItem('idFuncionario',idFuncionario);
  }
  private saveFotoUsuario(foto:string){
    localStorage.setItem('foto',foto);
  }
  private hanlerError(error:any): Observable<never>{
    let errorMessage = 'An error ocurred retrienvin data';
    if(error){
      errorMessage = `Error: code ${error.message}`
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}

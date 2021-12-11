import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { Transaccion } from '../modelo/Transaccion.model';

@Injectable()
export class TransaccionService {
  constructor(private http: HttpClient) {}

  getAllTransacciones(): Observable<any> {
    //listo
    return this.http.get(`${environment.API_URL}/transaccion/consultar`);
  }

  addTransaccion(transaccion: Transaccion): Observable<any> {
    //listo
    return this.http.post(`${environment.API_URL}/transaccion/`, transaccion);
  }
  editTransaccion(transaccion: Transaccion){
    
    return this.http.put<Transaccion>(`${environment.API_URL}/transaccion/editar/${transaccion.idTransaccion}`,transaccion);
  }
  deleteTransaccion(transaccion: Transaccion):Observable<any>{ //casi listo
    return this.http.delete<Transaccion>(`${environment.API_URL}/transaccion/${transaccion.idTransaccion}`);
  }
}

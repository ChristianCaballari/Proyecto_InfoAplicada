import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { map,catchError, tap } from 'rxjs/operators';
import { environment } from '../environment';
import { Swal2 } from '../mensajes/mensajes';
import { Solicitud} from '../modelo/solicitud.model';

@Injectable()
export class SolicitudService{
    constructor(private http: HttpClient,
        private router: Router,
    
        private swal: Swal2) {}


        getAllSolicitud() :Observable<Solicitud[]>{//listo
            return this.http.get<Solicitud[]>(`${environment.API_URL}/solicitud/consultar`)
          }
          
          getAllSolicitudTI() :Observable<any>{//listo
            return this.http.get(`${environment.API_URL}/solicitud/obtenerSolicitudesTI`);
          }
          deleteSolicitud(sol: Solicitud):Observable<any>{ //casi listo
            return this.http.delete<Solicitud>(`${environment.API_URL}/solicitud/${sol.idSolicitud}`);
          }
      
          addSolicitud(sol: Solicitud):Observable<any>{//listo
                return this.http.post(`${environment.API_URL}/solicitud/`,sol);
          }
      
          editSolicitud(sol: Solicitud){
      
            return this.http.put<Solicitud>(`${environment.API_URL}/solicitud/editar/${sol.idSolicitud}`,sol);
          }

          getDocumento(sol:Solicitud): Observable<any> {
            return this.http.get(`${environment.API_URL}/solicitud/documentoActa/${sol.idSolicitud}`);
          }
      
}
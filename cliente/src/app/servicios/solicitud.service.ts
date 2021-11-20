import { IRespuesta } from 'src/app/modelo/Respuesta.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../environment';
import { Swal2 } from '../mensajes/mensajes';
import { Solicitud } from '../modelo/solicitud.model';
import { filtro } from '../modelo/Filtro.model';

@Injectable()
export class SolicitudService {
  constructor(
    private http: HttpClient,
    private router: Router,

    private swal: Swal2
  ) {}

  getAllSolicitud(): Observable<Solicitud[]> {
    //listo
    return this.http.get<Solicitud[]>(
      `${environment.API_URL}/solicitud/consultar`
    );
  }
  
  getAllPendienteCancelados(): Observable<any[]> {
    //listo
    return this.http.get<any>(
      `${environment.API_URL}/solicitud/obtenerProyectoTerminadoCancelado`
    );
  }
  getAllSolicitudFiltro(filtro: filtro): Observable<any> {
    return this.http.post<Solicitud[]>(
      `${environment.API_URL}/solicitud/filtro`,
      filtro
    );
  }

  getAllSolicitudTI(): Observable<any> {
    //listo
    return this.http.get(
      `${environment.API_URL}/solicitud/obtenerSolicitudesTI`
    );
  }
  deleteSolicitud(sol: Solicitud): Observable<IRespuesta> {
    //casi listo
    return this.http.delete<IRespuesta>(
      `${environment.API_URL}/solicitud/${sol.idSolicitud}`
    );
  }
  terminarSolicitud(sol: Solicitud){
    return this.http.delete<IRespuesta>(
      `${environment.API_URL}/solicitud/TerminarSolicitud/${sol.idSolicitud}`
    );
  }
  addSolicitud(sol: Solicitud): Observable<any> {
    //listo
    return this.http.post(`${environment.API_URL}/solicitud/`, sol);
  }

  editSolicitud(sol: Solicitud) {
    return this.http.put<Solicitud>(
      `${environment.API_URL}/solicitud/editar/${sol.idSolicitud}`,
      sol
    );
  }

  getDocumento(sol: Solicitud): Observable<any> {
    return this.http.get(
      `${environment.API_URL}/solicitud/documentoActa/${sol.idSolicitud}`
    );
  }
}

import { AvanceDetetalle } from './../modelo/Avance.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from '../environment';


import { Avance } from '../modelo/Avance.model';




@Injectable()
export class AvanceService {
  constructor(private http: HttpClient) {}

  getAllAvances(): Observable<AvanceDetetalle[]> {
    return this.http.get<AvanceDetetalle[]>(`${environment.API_URL}/avance/consultar`);
  }

  getAvancesTrimestrales(): Observable<AvanceDetetalle[]> {
    return this.http.get<AvanceDetetalle[]>(`${environment.API_URL}/avance/obtenerAvanceTrimestral`);
  }
  getAvancesTrimestralesSolicitud(avance:Avance): Observable<AvanceDetetalle[]> {
    
    return this.http.post<AvanceDetetalle[]>(`${environment.API_URL}/avance/solicitud`,avance);
  }

  getAllAvanceProyectos(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/avance/obtenerAvanceProyecto`);
  }

  addAvance(avance: Avance): Observable<any> {
    //listo
    return this.http.post(`${environment.API_URL}/avance`, avance);
  }
  getDocumento(avance:AvanceDetetalle): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/avance/obtenerDocumento/${avance.idAvance}`);
  }

  getAvanceUpdate(avance:AvanceDetetalle): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/avance/obtenerAvanceUpdate/${avance.idAvance}`);
  }

  updateAvance(avance:Avance):Observable<any>{
    return this.http.patch(`${environment.API_URL}/avance/editar`,avance);
  }

  deleteAvance(avance: AvanceDetetalle):Observable<any>{ //casi listo
    return this.http.delete<AvanceDetetalle>(`${environment.API_URL}/avance/${avance.idAvance}`);
  }
}

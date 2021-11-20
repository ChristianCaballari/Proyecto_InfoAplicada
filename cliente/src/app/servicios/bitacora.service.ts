
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from '../environment';
import { Bitacora } from '../modelo/Bitacora.model';
import { BitacoraFiltro } from '../modelo/Filtro.model';


@Injectable()
export class BitacoraService {
  constructor(private http: HttpClient) {}

  getAllBitacoras(): Observable<Bitacora[]> {
    return this.http.get<Bitacora[]>(`${environment.API_URL}/bitacora/consultar`);
  }

  getBitacorasFiltro(filtro: BitacoraFiltro): Observable<any[]> {
    return this.http.post<Bitacora[]>(`${environment.API_URL}/bitacora/filtro`,filtro);
  }

 
}

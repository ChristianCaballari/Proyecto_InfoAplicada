import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sexo } from '../modelo/Sexo.model';
@Injectable()
export class SexoService{


  constructor(private http: HttpClient){

  }
  getSexo():Observable<Sexo[]>{
   return this.http.get<Sexo[]>(`${environment.API_URL}/sexo/obtenerSexo`);
  }
}
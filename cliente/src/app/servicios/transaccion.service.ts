import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';


@Injectable()
export class TransaccionService{
  constructor(
    private http: HttpClient,

   
  ) {}

  getAllTransacciones() :Observable<any>{//listo

    return this.http.get(`${environment.API_URL}/transaccion/consultar`)
}
}
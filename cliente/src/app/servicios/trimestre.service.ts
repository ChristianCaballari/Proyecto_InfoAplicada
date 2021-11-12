import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable()
export class TrimestreService{
  constructor(private http: HttpClient){}
 
    getAllTrimestres() :Observable<any>{//listo
      return this.http.get(`${environment.API_URL}/trimestre/trimestres`)
  }
}    
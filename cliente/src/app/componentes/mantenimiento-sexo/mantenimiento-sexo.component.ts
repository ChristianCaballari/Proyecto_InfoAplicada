import { SexoService } from 'src/app/servicios/sexoService';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-mantenimiento-sexo',
  templateUrl: './mantenimiento-sexo.component.html',
  styleUrls: ['./mantenimiento-sexo.component.css']
})
export class MantenimientoSexoComponent implements OnInit {

  dtOptions: any = {};
  tablaTrigger = new Subject<any>();
  
  constructor(private sexoService: SexoService) { }

  ngOnInit(): void {

  }


  eliminarSexo(){

  }

  obtenerSexo(){

  }
  
}

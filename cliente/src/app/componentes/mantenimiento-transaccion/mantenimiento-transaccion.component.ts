import { TrimestreService } from './../../servicios/trimestre.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-mantenimiento-transaccion',
  templateUrl: './mantenimiento-transaccion.component.html',
  styleUrls: ['./mantenimiento-transaccion.component.css']
})
export class MantenimientoTransaccionComponent implements OnInit {

  dtOptions: any = {};
  tablaTrigger = new Subject<any>();
  
  constructor(private trimestreService: TrimestreService) { }

  ngOnInit(): void {
  }

  eliminarTrimestre(){

  }
}

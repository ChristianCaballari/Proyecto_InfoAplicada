import { TransaccionService } from './../../servicios/transaccion.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit {

  dtOptions: any = {};
  tablaTrigger = new Subject<any>();
  constructor(private TransaccionService: TransaccionService) { }

  ngOnInit(): void {
  }

  eliminarTransaccion(){

  }
}

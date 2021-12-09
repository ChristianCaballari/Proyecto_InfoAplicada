import { Trimestre } from './../../modelo/Trimestre.model';
import { TransaccionService } from './../../servicios/transaccion.service';
import { Component, OnInit,ViewChild,OnDestroy} from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-mantenimiento-transaccion',
  templateUrl: './mantenimiento-transaccion.component.html',
  styleUrls: ['./mantenimiento-transaccion.component.css']
})
export class MantenimientoTransaccionComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  tablaTrigger = new Subject<any>();
  transacciones!: any[];
  constructor(private transaccionService: TransaccionService) { }

  ngOnInit(): void {

    this.obtenerTransacciones();
  }

  obtenerTransacciones(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      language:{
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json'
      }
    };
    this.transaccionService.getAllTransacciones().subscribe(
      (result) =>{
       this.transacciones = result;
       this.tablaTrigger.next();
      }
    )
  }
  ngOnDestroy(): void{
    //this.tablaTrigger.unsubscribe();
  }

  reload(){
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.transaccionService.getAllTransacciones()
      .subscribe((transacciones: any[]) => {
      this.transacciones = transacciones;
      this.tablaTrigger.next();
      });
    });
  }

 
  eliminarTransaccion(trimestre:Trimestre){

  }

  editarTransaccion(trimestre:Trimestre){

  }
}

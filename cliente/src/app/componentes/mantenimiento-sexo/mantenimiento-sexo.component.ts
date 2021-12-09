import { Sexo } from './../../modelo/Sexo.model';
import { SexoService } from 'src/app/servicios/sexoService';
import { Component,ViewChild, OnInit,OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-mantenimiento-sexo',
  templateUrl: './mantenimiento-sexo.component.html',
  styleUrls: ['./mantenimiento-sexo.component.css']
})
export class MantenimientoSexoComponent implements OnInit,OnDestroy {
 @ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;

  dtOptions: any = {};
  tablaTrigger = new Subject<any>();
  sexos!: any[];
  constructor(private sexoService: SexoService) { }

  ngOnInit(): void {

    this.obtenerSexos();
  }


  eliminarSexo(sexo:Sexo){

  }
  editarSexo(sexo:Sexo){

  }

  ngOnDestroy(): void{
    //this.tablaTrigger.unsubscribe();
  }

  obtenerSexos(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      language:{
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json'
      }
    };
   this.sexoService.getSexo().subscribe(
     (sexos:any[])=> {
         this.sexos = sexos;
         this.tablaTrigger.next();
        });
  } 

reload(){
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    // Destroy the table first
    dtInstance.destroy();
    this.sexoService.getSexo()
    .subscribe((sexos: any[]) => {
    this.sexos = sexos;
    this.tablaTrigger.next();
    });
  });
}
}


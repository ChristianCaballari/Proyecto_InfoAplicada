import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Solicitud } from 'src/app/modelo/solicitud.model';
import { SolicitudService } from './../../servicios/solicitud.service';
import { NgForm } from '@angular/forms';
import { Swal2 } from 'src/app/mensajes/mensajes';
import  Swal  from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import {Subject } from 'rxjs';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit,OnDestroy {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  solicitud: Solicitud = {
    idSolicitud:'',
    fechaHora:'',
    fechaInicio:'',
    fechaFin:'',
  };
  @ViewChild("solicitudForm") funcionarioForm: NgForm;
  @ViewChild("botonCerrar") botonCerrar: ElementRef;
  @ViewChild("botonAbrir") botonAbrir: ElementRef;
  
  dtOptions: DataTables.Settings = {};
  solicitudes!: any[];
  tablaTrigger = new Subject<any>();
  
  
  constructor(private solicitudService: SolicitudService,private swal: Swal2) { }
  ngOnDestroy(): void{
    this.tablaTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.obtenerSolicitudes();
  }

  reload(){
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.solicitudService.getAllSolicitud()
      .subscribe((solicitudes: any[]) => {
      this.solicitudes = solicitudes;
      this.tablaTrigger.next();
      });
    });
  }

  obtenerSolicitudes(){
    
    this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 6,
    language:{
      url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json'
    }
  };
      this.solicitudService.getAllSolicitud().subscribe((solicitudes)=>{
      this.solicitudes=solicitudes;
      this.tablaTrigger.next();
     });
  }



  editarSolicitud(sol: Solicitud){
   
  }
  eliminarSolicitud(sol: Solicitud){}

}

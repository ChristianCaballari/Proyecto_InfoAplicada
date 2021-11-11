import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Solicitud } from 'src/app/modelo/solicitud.model';
import { Funcionario2 } from 'src/app/modelo/Funcionario.model';
import { SolicitudService } from './../../servicios/solicitud.service';
import { FuncionarioService } from './../../servicios/funcionario.service';
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

  lista:string[]=["hola","que","tal", "estas"];

  solicitud: Solicitud = {
    idSolicitud:'',
    idUsuarioAplicativo:'',
    idResponsableTI:'',
    fechaInicio:'',
    fechaFin:'',
    idResponsableUsuarioFinal:'',
    documentoActaConstitutiva:''
  };

  funcionario:Funcionario2={
    idFuncionario:'',
     nombre:'',
     apellidos:''
   
  };


  @ViewChild("solicitudForm") funcionarioForm: NgForm;
  @ViewChild("botonCerrar") botonCerrar: ElementRef;
  @ViewChild("botonAbrir") botonAbrir: ElementRef;
  
  dtOptions: DataTables.Settings = {};
  solicitudes!: any[];
  funcionariosTI!: any[];
  funcionarios!:any[];
  tablaTrigger = new Subject<any>();
  
  
  constructor(private solicitudService: SolicitudService,private funcionarioService: FuncionarioService,
    private swal: Swal2) { }
  ngOnDestroy(): void{
    this.tablaTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.obtenerSolicitudes();
    this.obtenerFuncionariosTI();
    this.obtenerAllFuncionrios();
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

  

  agregarSolicitud(solicitudForm: NgForm){
    console.log(solicitudForm.value);
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

  public cerrarModal(){
    this.botonCerrar.nativeElement.click();
    this.funcionarioForm.resetForm();
    
  }

  obtenerFuncionariosTI(){
    this.funcionarioService.getFuncionarioTI().subscribe((funcionario)=>{
      this.funcionariosTI=funcionario;
    });

  }

  obtenerAllFuncionrios(){
    this.funcionarioService.getAllFuncionarios().subscribe((funcionario)=>{
      this.funcionarios=funcionario;
    });
  }


}

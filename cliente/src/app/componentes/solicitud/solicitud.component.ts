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

  solicitud: Solicitud = {
    idSolicitud:'',
    idUsuarioAplicativo:'',
    nombreAplicativo:'',
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


  @ViewChild("solicitudForm") solicitudForm: NgForm;
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
   
  
    let msg;
    if(solicitudForm.valid){

    
    if(solicitudForm.value.idSolicitud == '' || solicitudForm.value.idSolicitud == undefined){
      this.solicitud.idUsuarioAplicativo="1";
      this.solicitudService.addSolicitud(this.solicitud).subscribe((result:any) =>{
        this.reload();
        
      });
      msg="Agregado correctamente";
    }else{
      this.solicitudService.editSolicitud(this.solicitud).subscribe(
        (result)=>{
          console.log(result);
          this.reload();
        }
      )
      msg="Actualizado correctamente";

    }
    this.cerrarModal();
    solicitudForm.resetForm();
    this.swal.exitoso(msg);
  }
  
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


    this.solicitud.idSolicitud= sol.idSolicitud;
    this.solicitud.idUsuarioAplicativo= sol.idUsuarioAplicativo;
    this.solicitud.idResponsableTI= sol.idResponsableTI;
    this.solicitud.fechaInicio= sol.fechaInicio;
    this.solicitud.fechaFin= sol.fechaFin;
    this.solicitud.idResponsableUsuarioFinal= sol.idResponsableUsuarioFinal;
    this.solicitud.documentoActaConstitutiva= sol.documentoActaConstitutiva;
   
    this.botonAbrir.nativeElement.click();
   
  }
  eliminarSolicitud(sol: Solicitud){
    Swal.fire({
      title: 'Estas seguro que desea eliminar?',
      text: 'Solicitud',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
      
      this.solicitudService.deleteSolicitud(sol).subscribe(
        (result)=>{
          this.reload();
        }
      )
      this.swal.exitoso("Eliminado correctamente."); 
    }
  })
  }

  public cerrarModal(){
    this.botonCerrar.nativeElement.click();
    this.solicitudForm.resetForm();
    
  }

  obtenerFuncionariosTI(){
    this.funcionarioService.getFuncionarioTI().subscribe((funcionario)=>{
      this.funcionariosTI=funcionario;
      console.log(this.funcionariosTI);
      
    });

  }

  obtenerAllFuncionrios(){
    this.funcionarioService.getAllFuncionarios().subscribe((funcionario)=>{
      this.funcionarios=funcionario;
    });
  }


}

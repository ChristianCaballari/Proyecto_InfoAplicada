import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Solicitud } from 'src/app/modelo/solicitud.model';
import { Funcionario2,Funcionario1 } from 'src/app/modelo/Funcionario.model';
import { SolicitudService } from './../../servicios/solicitud.service';
import { FuncionarioService } from './../../servicios/funcionario.service';
import { NgForm } from '@angular/forms';
import { Swal2 } from 'src/app/mensajes/mensajes';
import  Swal  from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import {Subject } from 'rxjs';
import { IRespuesta } from 'src/app/modelo/Respuesta.models';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit,OnDestroy {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  habilidado:boolean = false;
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
  funcionario1:Funcionario1={
    idFuncionario:'',
     departamento:'',
     sexo:'',
     nombre:'',
     apellidos:'',
     fechaNacimiento:''
   
  };

  pdf64:string;
  @ViewChild("solicitudForm") solicitudForm: NgForm;
  @ViewChild("botonCerrar") botonCerrar: ElementRef;
  @ViewChild("botonAbrir") botonAbrir: ElementRef;
  @ViewChild('botonDetalles') botonDetalles: ElementRef;
  
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
      this.solicitud.idUsuarioAplicativo = localStorage.getItem("idFuncionario")?.toString();
      console.log(this.solicitud);
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

showPdf(pdf:any) {
   
  const linkSource = pdf;
  const downloadLink = document.createElement("a");
  
  const fileName = "DocumentoAvance.pdf";
     
      downloadLink.href = linkSource;
       //downloadLink = fileName;

      window.open(downloadLink.href)
    //  downloadLink.click();

//  console.log(this.pdf);
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

  onFileChangedSolicitud(e:any){

    console.log(e[0].base64);
    this.solicitud.documentoActaConstitutiva = e[0].base64;
  }

  verdocumentoActaconstituvia(sol: Solicitud){
    this.solicitudService.getDocumento(sol).subscribe(
      (result) =>{
        this.pdf64 = result[0].documentoActaConstitutiva;
        console.log(this.pdf64);
        this.showPdf(this.pdf64);
      }
    )
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
          let data = result as IRespuesta
          console.log(data);
         if(data.valido='Si'){
           this.swal.exitoso(data.msg);
           this.reload();
         
         }else{
           this.swal.error(data.msg);
         }
        }
      )
    }
  })
  }

  public cerrarModal(){
    this.botonCerrar.nativeElement.click();
    this.solicitudForm.resetForm();
    this.habilidado = false;
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

  verDetalles(solicitud:Solicitud,num : string,idFun:number){
    let id:any;

    console.log("Ver");
    console.log(num);
    console.log(idFun);
    console.log("Ver");
    
    if(num==='1'){
      id= idFun;
      //alert(`Num ${num}, IdFuncionario: ${idFun} `);
    }else if(num==='2'){
      id= idFun;
     // alert(`Num ${num}, IdFuncionario: ${idFun} `);
    }else if(num==='3'){
      id= idFun;
    //  alert(`Num ${num}, IdFuncionario: ${idFun} `);
    }

    
    this.funcionario1.idFuncionario=id;
    this.funcionarioService.getFuncionarioSolicitud(this.funcionario1).subscribe(
      (result)=>{
        this.funcionario1.idFuncionario= result[0].idFuncionario;
        this.funcionario1.departamento = result[0].departamento;
        this.funcionario1.sexo = result[0].sexo;
        this.funcionario1.nombre = result[0].nombre;
        this.funcionario1.apellidos = result[0].apellidos;
        this.funcionario1.fechaNacimiento = result[0].fechaNacimiento;
        
      }
    
      )
      
   this.botonDetalles.nativeElement.click();
  }

  cerrarDetalles(){
    this.funcionario.idFuncionario = "";
        this.funcionario1.sexo = "";
        this.funcionario1.nombre = "";
        this.funcionario1.apellidos = "";
        this.funcionario1.departamento = "";
        this.funcionario1.fechaNacimiento = "";
        this.habilidado = false;
  }


}

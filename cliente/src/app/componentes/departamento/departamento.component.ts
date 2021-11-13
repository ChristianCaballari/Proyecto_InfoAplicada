import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Departamento } from 'src/app/modelo/Departamento.model';
import { DepartamentoService } from './../../servicios/departamento.service';
import { NgForm } from '@angular/forms';
import  Swal  from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import {Subject } from 'rxjs';
import { IRespuesta } from 'src/app/modelo/Respuesta.models';
import { Swal2 } from 'src/app/mensajes/mensajes';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit, OnDestroy{
@ViewChild(DataTableDirective, {static: false})
dtElement: DataTableDirective;
departamento: Departamento = {
    idDepartamento: '',
    descripcion: ''     
};
@ViewChild("departamentoForm") funcionarioForm: NgForm;
@ViewChild("busquedaForm") busquedaForm: NgForm;
@ViewChild("botonCerrar") botonCerrar: ElementRef;
@ViewChild("botonAbrir") botonAbrir: ElementRef;

dtOptions: DataTables.Settings = {};
departamentos!: any[];
tablaTrigger = new Subject<any>();


  constructor(private departamentoService: DepartamentoService,private swal: Swal2) { 
    
  }
 
ngOnInit(): void {

 this.obtenerDepartamentos();

}

reload(){
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    // Destroy the table first
    dtInstance.destroy();
    this.departamentoService.getAllDepartament()
    .subscribe((departamentos: any[]) => {
    this.departamentos = departamentos;
    this.tablaTrigger.next();
    });
  });
}
ngOnDestroy(): void{
  this.tablaTrigger.unsubscribe();
}
  obtenerDepartamentos(){
    
    this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 6,
    language:{
      url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json'
    }
  };
      this.departamentoService.getAllDepartament().subscribe((departamentos)=>{
      this.departamentos=departamentos;
      this.tablaTrigger.next();
     });
  }

editarDepartamento(departamento: Departamento){
  //   //this.departamento=dep;
    this.departamento.descripcion = departamento.descripcion;
    this.departamento.idDepartamento = departamento.idDepartamento;
    this.botonAbrir.nativeElement.click();
}
eliminarDepartamento(departamento: Departamento){
  let notificacion;
        Swal.fire({
        title: 'Estas seguro que desea eliminar el siguiente funcionario?',
        text: 'Funcionario',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
        
        this.departamentoService.deleteDepartament(departamento).subscribe(
          (result)=>{
            let data = result as IRespuesta
            if(data.valido='Si'){
             notificacion = data.msg;
             this.swal.exitoso(notificacion); 
             this.reload();  
            }else{
              notificacion = data.msg;
              this.swal.error(notificacion); 
            }
          }
        )
      }
    })
}
agregarDepartamento(departamentoForm: NgForm){

    let msg;
    if(departamentoForm.valid){

    
    if(departamentoForm.value.idDepartamento == '' || departamentoForm.value.idDepartamento == undefined){
      this.departamentoService.addDepartament(this.departamento).subscribe((result:any) =>{
        this.reload();
        console.log("En Insertar");
      });
      msg="Agregado correctamente";
    }else{
      this.departamentoService.editDepartament(this.departamento).subscribe(
        (result)=>{
          console.log(result);
          this.reload();
        }
      )
      msg="Actualizado correctamente";

    }
    this.cerrarModal();
    departamentoForm.resetForm();
    this.swal.exitoso(msg);
  
  }
  }
  public cerrarModal(){
    this.botonCerrar.nativeElement.click();
    this.funcionarioForm.resetForm();
    
  }
}

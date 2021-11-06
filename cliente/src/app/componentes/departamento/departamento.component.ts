import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Departamento } from 'src/app/modelo/Departamento.model';
import { DepartamentoService } from './../../servicios/departamento.service';
import { NgForm } from '@angular/forms';
import { Swal2 } from 'src/app/mensajes/mensajes';
import  Swal  from 'sweetalert2';
import { Observable, Subject, throwError, Subscription } from 'rxjs';



@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {
  indice : number;
  subscription: Subscription;
 
  departamento: Departamento= {
    idDepartamento: '',
    descripcion: ''     
};


  @ViewChild("departamentoForm") funcionarioForm: NgForm;
  @ViewChild("botonCerrar") botonCerrar: ElementRef;
  @ViewChild("botonAbrir") botonAbrir: ElementRef;

  page = 1;
  pageSize = 4;
  collectionSize: number;
   
  
  departamentos: Departamento[];
  departamentos1: any={};

  constructor(private departamentoService: DepartamentoService,private swal: Swal2) { 
    
  }
  ngOnInit(): void {
  
    this.obtenerDepartamentos();
    this.subscription = this.departamentoService.getRefres$().subscribe(() =>{
      this.obtenerDepartamentos();
    })

  }
  agregarDepartamento(departamentoForm: NgForm){
    console.log(this.departamento);
    let msg;
    if(departamentoForm.valid){
    
    if(departamentoForm.value.idDepartamento === ''){
      this.departamentoService.addDepartament(this.departamento);
      msg="Agregado correctamente";
    }else{
      console.log("En Editar");
      this.departamentoService.editDepartament(this.departamento)
      msg="Actualizado correctamente";
    }
    this.cerrarModal();
    this.obtenerDepartamentos();
    this.swal.exitoso(msg);
  }
  }
  obtenerDepartamentos(){
      this.departamentoService.getAllDepartament().subscribe((response)=>{
      this.departamentos=response;
     })
  }
  editarDepartamento(dep: Departamento){
    //this.departamento=dep;
    this.departamento.descripcion = dep.descripcion;
    this.departamento.idDepartamento = dep.idDepartamento;
    this.botonAbrir.nativeElement.click();
  }

  // Modifica el arreglo temporal
  // private modificarDepTemp(departamento:Departamento){
  //   this.departamentos.map(dep =>{
  //     if(departamento.idDepartamento = dep.idDepartamento ){
  //        const {descripcion} = departamento;
  //        dep.descripcion = descripcion;
  //     }
  //   })
  // }
  private eliminarDepTemp(departamento:Departamento){
    console.log(departamento);

    this.indice = Number(departamento.idDepartamento);
    console.log(this.indice);
    this.departamentos.splice(this.indice,1);
    
  }
  private agregarDepTemp(departamento:Departamento){
    if(this.departamentos == null){
      this.departamentos = [];
    }
    this.departamentos.push(departamento);
  }
 
  eliminarDepartamento(dep: Departamento){
   
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
        
        this.departamentoService.deleteDepartament(dep);
       this.eliminarDepTemp(dep);
       // this.obtenerDepartamentos();
          
          Swal.fire(
            'Eliminado',
            'Eliminado correctamente.',
            'success'   
          )
        }
      })   
  }
  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
    
  }

  private setDepartamentos(departamentos: Departamento[]){
    this.departamentos1 = departamentos;

  }
}

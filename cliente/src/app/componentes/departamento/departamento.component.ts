import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Departamento } from 'src/app/modelo/Departamento.model';
import { DepartamentoService } from './../../servicios/departamento.service';
import { NgForm } from '@angular/forms';
import { Swal2 } from 'src/app/mensajes/mensajes';
import  Swal  from 'sweetalert2';


@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {

  departamento: Departamento= {
    idDepartamento: '',
    descripcion: ''     
};

  @ViewChild("departamentoForm") funcionarioForm: NgForm;

  @ViewChild("botonCerrar") botonCerrar: ElementRef;

  page = 1;
  pageSize = 4;
  collectionSize: number;
   
  
  departamentos: Departamento[];
  departamentos1: any={};

  constructor(private departamentoService: DepartamentoService,private swal: Swal2) { 

  }

  ngOnInit(): void {
  
    this.obtenerDepartamentos();

  }

  agregarDepartamento(departamentoForm: NgForm){
    console.log(departamentoForm.value);
    //this.departamentoService.addDepartament(departamentoForm)
  }
  obtenerDepartamentos(): void{
      this.departamentoService.getAllDepartament().subscribe((response)=>{

      this.departamentos1=response;
      this.departamentos=this.departamentos1;
 
     })
  }

  eliminarDepartamento(dep: Departamento){
    console.log("Departamento-> ",dep);
    ///this.departamentoService.deleteDepartament(dep);
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
          this.obtenerDepartamentos();
          Swal.fire(
            'Eliminado',
            'Eliminado correctamente.',
            'success'   
          )
        }
      })
    
      
  }

  

}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Funcionario1,Funcionario } from 'src/app/modelo/Funcionario.model';
import { FuncionarioService } from './../../servicios/funcionario.service';
import { NgForm } from '@angular/forms';
import  Swal  from 'sweetalert2';

let FUNCIONARIOS2: Funcionario1[]=[]
@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {

funcionario: Funcionario = {
    idDepartamento: '',
    idSexo: '',
    nombre: '',
    apellidos: '',
    fachaNacimiento: '',
    foto: '',
    loginName: '',
    password: '',     
};

  @ViewChild("funcionarioForm") funcionarioForm: NgForm;

  @ViewChild("botonCerrar") botonCerrar: ElementRef;


  page = 1;
  pageSize = 4;
  collectionSize: number;
   
  
  funcionarios: Funcionario1[];
  funcionarios1: any={};

  constructor(private funcionarioService: FuncionarioService) { 
   
   // this.refreshFuncionarios(); 
   this.refreshFuncionarios();  
   console.log("Hola ------------o");
   this.funcionarioService. getAllFuncionarios().subscribe((res) => {
    console.log("Hola ------------okjkj");
       console.log(res);
       
    console.log("Hola ------------okjkjk");
   });
   console.log("Hola ------------o");
  }

  ngOnInit(): void {
   
    this.funcionarioService.getFuncionarios().then(rest =>{
      console.log(rest);
      this.funcionarios1 = rest;
      this.funcionarios = this.funcionarios1;
      this.collectionSize = this.funcionarios.length;
     
      FUNCIONARIOS2 = this.funcionarios;
      console.log(this.collectionSize);
      console.log(this.funcionarios);

     
    });   
  }

  refreshFuncionarios() {
    console.log(this.funcionarios);
    this.funcionarios = FUNCIONARIOS2
     .map((funcionario, i) => ({id: i + 1, ...funcionario}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
 
  agregar(funcionarioForm: NgForm){

    console.log(funcionarioForm.value);
    
    if(funcionarioForm.valid){
       
        //notificacion exitos
        this.cerrarModal();
    }else{
     //notificacion
    }
    // if(!valid){

    // }else{
    //   console.log(value);
    //   this.funcionarioForm.resetForm();
    //   this.cerrarModal();
    // }
  }



  eliminarFuncionario(funcionario1:Funcionario1){
  
    const {nombre, apellidos, departamento } = funcionario1;
    Swal.fire({
      title: 'Estas Seguro de Eliminar el Siguiente Funcionario?',
      text: `${nombre} ${apellidos} ${departamento}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'Funcionario eliminado Correctamente.',
          'success'
        )
      }
    })
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }
}

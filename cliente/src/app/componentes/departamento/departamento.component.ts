import { Component, OnInit } from '@angular/core';
import { Departamento } from 'src/app/modelo/Departamento.model';
import { DepartamentoService } from './../../servicios/departamento.service';
import { NgForm } from '@angular/forms';
import  Swal  from 'sweetalert2';

let DEPARTAMENTOS2: Departamento[]=[]
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

  //@ViewChild("departamentoForm") funcionarioForm: NgForm;

  //@ViewChild("botonCerrar") botonCerrar: ElementRef;

  page = 1;
  pageSize = 4;
  collectionSize: number;
   
  
  departamentos: Departamento[];
  departamentos1: any={};

  constructor(private departamentoService: DepartamentoService) { 

  }

  ngOnInit(): void {
    this.departamentoService.getDepartamentos().then(rest =>{
      console.log(rest);
      this.departamentos1 = rest;
      this.departamentos = this.departamentos1;
      this.collectionSize = this.departamentos.length;
     
      DEPARTAMENTOS2 = this.departamentos;
      console.log(this.collectionSize);
      console.log(this.departamentos);
    }); 

  }

  

}

import { Funcionario1 } from 'src/app/modelo/Funcionario.model';
import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from './../../servicios/funcionario.service';


let FUNCIONARIOS2: Funcionario1[]=[]
@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {

  page = 1;
  pageSize = 4;
  collectionSize: number;
   
  
  funcionarios: Funcionario1[];
  funcionarios1: any={};

  constructor(private funcionarioService: FuncionarioService) { 
    console.log("Hola Perro");
   // this.refreshFuncionarios();  
  }

  ngOnInit(): void {
    console.log("Hola Perro");
    this.funcionarioService.getFuncionarios().then(rest =>{
      console.log(rest);
      this.funcionarios1 = rest;
      this.funcionarios = this.funcionarios1;
      this.collectionSize = this.funcionarios.length;
     
      FUNCIONARIOS2 = this.funcionarios;
      console.log(this.collectionSize);
      console.log(this.funcionarios);
    });
    this.refreshFuncionarios();  
  }


  refreshFuncionarios() {
    console.log(this.funcionarios);
    this.funcionarios = FUNCIONARIOS2
     .map((funcionario, i) => ({id: i + 1, ...funcionario}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}

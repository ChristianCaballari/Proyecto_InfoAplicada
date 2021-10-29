import { FuncionarioService } from './../../servicios/funcionario.service';
import { Component, OnInit } from '@angular/core';
//import { Funcionario1 } from 'src/app/modelo/Funcionario.model';

//const FUNCIONARIOS : Funcionario1[] = [];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {

 // funcionarios: any;
 // collectionSize:number;
  constructor(private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
 /*   this.funcionarioService.getFuncionarios().then(rest =>{
     console.log(rest);
    // FUNCIONARIOS = rest;
     this.funcionarios = rest;
     this.collectionSize = this.funcionarios.length;
    
    
     console.log(this.collectionSize);
     console.log(this.funcionarios);
    });*/
  }
}

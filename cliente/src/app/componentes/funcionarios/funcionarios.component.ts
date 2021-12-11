import { IRespuesta } from 'src/app/modelo/Respuesta.models';
import { SexoService } from 'src/app/servicios/sexoService';
import { DepartamentoService } from './../../servicios/departamento.service';
import {Component,OnInit,ViewChild,ElementRef,OnDestroy,} from '@angular/core';
import {Funcionario1,Funcionario,FuncionarioD,} from 'src/app/modelo/Funcionario.model';
import { FuncionarioService } from './../../servicios/funcionario.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Swal2 } from './../../mensajes/mensajes';
@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css'],
})
export class FuncionariosComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  funcionario: Funcionario = {
    idFuncionario: '',
    idDepartamento: '',
    idSexo: '',
    nombre: '',
    apellidos: '',
    fachaNacimiento: '',
    foto: '',
    loginName: '',
    password: '',
  };
  funcionarioD: FuncionarioD = {
    departamento: '',
    sexo: '',
    nombre: '',
    apellidos: '',
    fachaNacimiento: '',
    foto: '',
    loginName: '',
  };
  sexoData:any={
    idSexo:'-1',
    descripcion :"Seleccione el Sexo"
  }
  deparData:any={
    idDepartamento:'-1',
    descripcion :"Seleccione el departamento"
  }
  sexoSeleted:number;
  departamentSelected:number;

  isSexoSelected:boolean = false;
  isDepartSelected:boolean = false;

  @ViewChild('funcionarioForm') funcionarioForm: NgForm;
  @ViewChild('botonCerrar') botonCerrar: ElementRef;
  @ViewChild('botonAbrir') botonAbrir: ElementRef;
  @ViewChild('botonDetalles') botonDetalles: ElementRef;

  dtOptions: any = {};
  funcionarios!: any[];
  tablaTrigger = new Subject<any>();
  departamentos!: any[];
  sexo!: any[];
  habilidado: boolean = false;
  fotoValida: boolean = true;
  constructor(
    private funcionarioService: FuncionarioService,
    private departamentoService: DepartamentoService,
    private sexoService: SexoService,
    private swal: Swal2
  ) {}

  onFileChanged(e: any) {
    
    let extencionPermitida = /(.png|.jpg)$/i;
    let extencionvalida = e[0].name;
    
    console.log("Fotoooo");
    console.log(e[0].base64);

    if (!extencionPermitida.exec(extencionvalida)) {
      this.swal.error('Solo se permiten Fotos (.png y .jpg)');
      return;
    } else {
      e[0].base64 ? (this.fotoValida = true) : (this.fotoValida = false);

      this.funcionario.foto = e[0].base64;
     
      
    }
  }
  onFileData(e: any) {
    //console.log(this.fotoValida);
    this.fotoValida = false;
   // console.log(this.fotoValida);
  }
  validarSelectSexo(){
    if(this.funcionario.idSexo == '-1' || this.funcionario.idSexo == ''){
       this.isSexoSelected = false;
    }else{
       this.isSexoSelected = true;
    }
    console.log(this.isSexoSelected);
    console.log(this.funcionario.idSexo);
  }
  validarSelectDepartamento(){
    if(this.funcionario.idDepartamento == '-1' || this.funcionario.idDepartamento == ''){
      this.isDepartSelected = false;
   }else{
      this.isDepartSelected = true;
   }

  }

  ngOnInit(): void {
    this.obtenerFuncionarios();
    this.obtenerDepartamentos();
    this.obtenerSexo();
  }

  ngOnDestroy(): void {
    this.tablaTrigger.unsubscribe();
  }
  obtenerDepartamentos() {
    this.departamentoService.getAllDepartament().subscribe((departamentos) => {
      this.departamentos = departamentos;
      this.departamentos.push(this.deparData);
      this.departamentSelected = -1;
    });
  }
  obtenerSexo() {
    this.sexoService.getSexo().subscribe((sexo) => {
      this.sexo = sexo;
      this.sexo.push(this.sexoData);
      console.log("Debe ser de 4 "+this.sexo.length);
      this.sexoSeleted = -1;
    });
  }
  obtenerFuncionarios() {
    this.dtOptions = { 
      pagingType: 'full_numbers',
      pageLength: 6,
      responsive: true,
     // dom: '<lf<Bt>ip>',
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json',
      },
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        {
          extend: 'excelHtml5', 
          titleAttr: 'Exportar a Excel',
          title:"Reporte Funcionarios",
          text:'<i class="fas fa-file-excel fs-4"></i>',
          className: 'bg-success text-light rounded-3',
          filename: 'Reporte de Funcionarios',
          exportOptions: {
            columns: [0, 1, 2, 3, 4],
          },
        },
        {
          extend: 'pdfHtml5',
          titleAttr: 'Exportar a PDF',
          title:"Reporte Funcionarios",
          text:'<i class="fas fa-file-pdf fs-4"></i>',
          className: 'bg-danger text-light rounded-3',
          filename: 'Reporte de Funcionarios',
          exportOptions: {
            columns: [0, 1, 2, 3, 4],
          },
          
        },
      ],
    };

    this.funcionarioService.getAllFuncionarios().subscribe((funcionarios) => {
      this.funcionarios = funcionarios;
      console.log(funcionarios);
      this.tablaTrigger.next();
    });
  }

  reload() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.funcionarioService
        .getAllFuncionarios()
        .subscribe((funcionarios: any[]) => {
          this.funcionarios = funcionarios;
          this.tablaTrigger.next();
        });
    });
  }
  verDetalles(funcionario: Funcionario) {
    this.funcionarioService
      .getByIdDetallesFuncionario(funcionario)
      .subscribe((result) => {
        console.log(result[0].nombre);
        this.funcionarioD.departamento = result[0].departamento;
        this.funcionarioD.sexo = result[0].sexo;
        this.funcionarioD.nombre = result[0].nombre;
        this.funcionarioD.apellidos = result[0].apellidos;
        this.funcionarioD.loginName = result[0].loginName;
        this.funcionarioD.foto = result[0].foto;
        this.funcionarioD.fachaNacimiento = result[0].fechaNacimiento;
      });
    this.botonDetalles.nativeElement.click();
  }
  cerrarDetalles() {
    this.funcionario.idFuncionario = '';
    this.funcionarioD.sexo = '';
    this.funcionarioD.nombre = '';
    this.funcionarioD.apellidos = '';
    this.funcionarioD.loginName = '';
    this.funcionarioD.foto = '';
    this.funcionarioD.departamento = '';
    this.funcionarioD.fachaNacimiento = '';
    this.habilidado = false;
  }
  editarFuncionario(funcionario: Funcionario) {
    
    this.funcionarioService.getById(funcionario).subscribe((result) => {
    
      this.funcionario.idFuncionario = result[0].idFuncionario;
      this.funcionario.idSexo = result[0].idSexo;
      this.funcionario.nombre = result[0].nombre;
      this.funcionario.apellidos = result[0].apellidos;
      this.funcionario.loginName = result[0].loginName;
      this.funcionario.foto = result[0].foto;
      this.funcionario.idDepartamento = result[0].idDepartamento;
      this.funcionario.fachaNacimiento = result[0].fechaNacimiento;
      this.funcionario.password = '*****';
      this.habilidado = true;
      this.abrirModal();
    });
  }

  agregar(funcionarioForm: NgForm) {
   
    let msg;
    if (funcionarioForm.valid) {
      if (
        this.funcionario.idFuncionario == '' ||
        this.funcionario.idFuncionario == null
      ) {
        this.funcionarioService
          .nuevoFuncionario(this.funcionario)
          .subscribe((result) => {
            console.log(result);
            this.reload();
          });
        msg = 'Agregado correctamente';
      } else {
        console.log('En Editar');
        this.funcionarioService
          .updateFuncionario(this.funcionario)
          .subscribe((result) => {
            console.log(result);
            this.reload();
          });
        msg = 'Actualizado correctamente';
      }

      this.swal.exitoso(msg);
      this.cerrarModal();
    }
  }

  eliminarFuncionario(funcionario1: Funcionario1) {
    const { nombre, apellidos, departamento } = funcionario1;
    Swal.fire({
      title: 'Estas Seguro de Eliminar el Siguiente Funcionario?',
      text: `${nombre} ${apellidos} ${departamento}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.funcionarioService.delete(funcionario1).subscribe((result) => {
          let data = result as IRespuesta;
          console.log(data);
          if ((data.valido = 'Si')) {
            this.swal.exitoso(data.msg);
            this.reload();
          } else {
            this.swal.error(data.msg);
          }
        });
      }
    });
    return;
  }
  cerrarModal() {
    this.botonCerrar.nativeElement.click();
    this.funcionarioForm.resetForm();
    // this.funcionario.foto = '';
    this.habilidado = false;
  }
  private abrirModal() {
    this.botonAbrir.nativeElement.click();
  }
}

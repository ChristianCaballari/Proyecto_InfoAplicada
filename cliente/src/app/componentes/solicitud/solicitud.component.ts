import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Solicitud } from 'src/app/modelo/solicitud.model';
import { filtro } from 'src/app/modelo/Filtro.model';
import { Funcionario2, Funcionario1 } from 'src/app/modelo/Funcionario.model';
import { SolicitudService } from './../../servicios/solicitud.service';
import { FuncionarioService } from './../../servicios/funcionario.service';
import { NgForm } from '@angular/forms';
import { Swal2 } from 'src/app/mensajes/mensajes';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { IRespuesta } from 'src/app/modelo/Respuesta.models';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css'],
})
export class SolicitudComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  habilidado: boolean = false;
  solicitud: Solicitud = {
    idSolicitud: '',
    nombre: '',
    idUsuarioAplicativo: '',
    nombreAplicativo: '',
    idResponsableTI: '',
    fechaInicio: '',
    fechaFin: '',
    idResponsableUsuarioFinal: '',
    documentoActaConstitutiva: '',
  };

  funcionario: Funcionario2 = {
    idFuncionario: '',
    nombre: '',
    apellidos: '',
  };
  funcionario1: Funcionario1 = {
    idFuncionario: '',
    departamento: '',
    sexo: '',
    nombre: '',
    apellidos: '',
    fechaNacimiento: '',
  };
  filtro1: filtro = {
    fechaInicio: '',
    fechaFin: '',
  };

  pdf64: string;
  @ViewChild('solicitudForm') solicitudForm: NgForm;
  @ViewChild('filtroForm') filtroForm: NgForm;
  @ViewChild('botonCerrar') botonCerrar: ElementRef;
  @ViewChild('botonAbrir') botonAbrir: ElementRef;
  @ViewChild('botonDetalles') botonDetalles: ElementRef;

  dtOptions: any = {};
  solicitudes!: any[];
  funcionariosTI!: any[];
  funcionarios!: any[];
  tablaTrigger = new Subject<any>();

  constructor(
    private solicitudService: SolicitudService,
    private funcionarioService: FuncionarioService,
    private swal: Swal2
  ) {}

  ngOnDestroy(): void {
    this.tablaTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.obtenerSolicitudes();
    this.obtenerFuncionariosTI();
    this.obtenerAllFuncionrios();
  }

  reload() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.solicitudService
        .getAllSolicitud()
        .subscribe((solicitudes: any[]) => {
          this.solicitudes = solicitudes;
          this.tablaTrigger.next();
        });
    });
  }

  agregarSolicitud(solicitudForm: NgForm) {
    console.log(this.solicitud);

    console.log(this.solicitud.documentoActaConstitutiva);
    let msg;
    if (solicitudForm.valid) {
      if (
        solicitudForm.value.idSolicitud == '' ||
        solicitudForm.value.idSolicitud == undefined
      ) {
        this.solicitud.idUsuarioAplicativo = localStorage
          .getItem('idFuncionario')
          ?.toString();
        console.log(this.solicitud.idUsuarioAplicativo);
        this.solicitudService
          .addSolicitud(this.solicitud)
          .subscribe((result: any) => {
            this.reload();
          });
        msg = 'Agregado correctamente';
      } else {
        console.log('Editar solicitud---->', this.solicitud);
        this.solicitudService
          .editSolicitud(this.solicitud)
          .subscribe((result) => {
            console.log(result);
            this.reload();
          });
        msg = 'Actualizado correctamente';
      }
      this.cerrarModal();
      solicitudForm.resetForm();
      // this.swal.exitoso(msg);
    }
  }

  showPdf(pdf: any) {
    const linkSource = pdf;
    const downloadLink = document.createElement('a');

    const fileName = 'DocumentoAvance.pdf';

    downloadLink.href = linkSource;
    //downloadLink = fileName;

    window.open(downloadLink.href);
    //  downloadLink.click();

    //  console.log(this.pdf);
  }

  obtenerSolicitudes() {
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
          title: 'Reporte proyectos',
          text: '<i class="fas fa-file-excel fs-4"></i>',
          className: 'bg-success text-light rounded-3',
          filename: 'Reporte de proyectos',
          exportOptions: {
            columns: [0, 1, 2, 3],
          },
        },
        {
          extend: 'pdfHtml5',
          titleAttr: 'Exportar a PDF',
          title: 'Reporte proyectos',
          text: '<i class="fas fa-file-pdf fs-4"></i>',
          className: 'bg-danger text-light rounded-3',
          filename: 'Reporte de proyectos',
          exportOptions: {
            columns: [0, 1, 2, 3],
          },
        },
      ],
    };

    this.solicitudService.getAllSolicitud().subscribe((solicitudes) => {
      this.solicitudes = solicitudes;
      console.log(this.solicitudes);
      this.tablaTrigger.next();
    });
  }

  onFileChangedSolicitud(e: any) {
    this.solicitud.documentoActaConstitutiva = e[0].base64;
  }

  verdocumentoActaconstituvia(sol: Solicitud) {
    this.solicitudService.getDocumento(sol).subscribe((result) => {
      this.pdf64 = result[0].documentoActaConstitutiva;
      console.log(this.pdf64);
      this.showPdf(this.pdf64);
    });
  }
  editarSolicitud(sol: Solicitud) {
    this.solicitud.nombre = sol.nombre;
    this.solicitud.idSolicitud = sol.idSolicitud;
    this.solicitud.idUsuarioAplicativo = sol.idUsuarioAplicativo;
    this.solicitud.idResponsableTI = sol.idResponsableTI;
    this.solicitud.fechaInicio = sol.fechaInicio;
    this.solicitud.fechaFin = sol.fechaFin;
    this.solicitud.idResponsableUsuarioFinal = sol.idResponsableUsuarioFinal;
    this.solicitud.documentoActaConstitutiva = sol.documentoActaConstitutiva;

    this.botonAbrir.nativeElement.click();
  }
  eliminarSolicitud(sol: Solicitud) {
    Swal.fire({
      title: 'Estas seguro que desea eliminar?',
      text: 'Solicitud',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.solicitudService.deleteSolicitud(sol).subscribe((result) => {
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
  }

  public cerrarModal() {
    this.botonCerrar.nativeElement.click();
    this.solicitudForm.resetForm();
    this.habilidado = false;
  }

  obtenerFuncionariosTI() {
    this.funcionarioService.getFuncionarioTI().subscribe((funcionario) => {
      this.funcionariosTI = funcionario;
      console.log(this.funcionariosTI);
    });
  }

  obtenerAllFuncionrios() {
    this.funcionarioService.getAllFuncionarios().subscribe((funcionario) => {
      this.funcionarios = funcionario;
    });
  }

  verDetalles(solicitud: Solicitud, num: string, idFun: number) {
    let id: any;

    if (num === '1') {
      id = idFun;
      //alert(`Num ${num}, IdFuncionario: ${idFun} `);
    } else if (num === '2') {
      id = idFun;
      // alert(`Num ${num}, IdFuncionario: ${idFun} `);
    } else if (num === '3') {
      id = idFun;
      //  alert(`Num ${num}, IdFuncionario: ${idFun} `);
    }

    this.funcionario1.idFuncionario = id;
    this.funcionarioService
      .getFuncionarioSolicitud(this.funcionario1)
      .subscribe((result) => {
        this.funcionario1.idFuncionario = result[0].idFuncionario;
        this.funcionario1.departamento = result[0].departamento;
        this.funcionario1.sexo = result[0].sexo;
        this.funcionario1.nombre = result[0].nombre;
        this.funcionario1.apellidos = result[0].apellidos;
        this.funcionario1.fechaNacimiento = result[0].fechaNacimiento;
      });

    this.botonDetalles.nativeElement.click();
  }

  cerrarDetalles() {
    this.funcionario.idFuncionario = '';
    this.funcionario1.sexo = '';
    this.funcionario1.nombre = '';
    this.funcionario1.apellidos = '';
    this.funcionario1.departamento = '';
    this.funcionario1.fechaNacimiento = '';
    this.habilidado = false;
  }

  filtro(filtroForm: NgForm) {
    if (filtroForm.valid) {
      this.filtro1 = filtroForm.value;

      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        this.solicitudService
          .getAllSolicitudFiltro(this.filtro1)
          .subscribe((result) => {
            this.solicitudes = result;
            this.tablaTrigger.next();
          });
      });
    }
  }

  finalizarProyecto(sol: Solicitud) {
    Swal.fire({
      title: 'Estas seguro de finalizar el Proyecto?',
      text: 'Solicitud',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Finalizar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.solicitudService.terminarSolicitud(sol).subscribe((result) => {
         

          this.swal.exitoso("Finalizado");
          this.reload();
        });
      }
    });
  }
}

import { TransaccionService } from './../../servicios/transaccion.service';
import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import  Swal  from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Transaccion } from 'src/app/modelo/Transaccion.model';
import { NgForm } from '@angular/forms';
import { Swal2 } from 'src/app/mensajes/mensajes';
@Component({
  selector: 'app-mantenimiento-transaccion',
  templateUrl: './mantenimiento-transaccion.component.html',
  styleUrls: ['./mantenimiento-transaccion.component.css'],
})
export class MantenimientoTransaccionComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};
  tablaTrigger = new Subject<any>();
  transacciones!: any[];

  @ViewChild('transaccionForm') transaccionForm: NgForm;
  @ViewChild('botonCerrar') botonCerrar: ElementRef;
  @ViewChild('botonAbrir') botonAbrir: ElementRef;
  constructor(
    private transaccionService: TransaccionService,
    private swal: Swal2
  ) {}

  ngOnInit(): void {
    this.obtenerTransacciones();
  }
  transaccion: Transaccion = {
    idTransaccion: '',
    descripcion: '',
  };

  obtenerTransacciones() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json',
      },
    };
    this.transaccionService.getAllTransacciones().subscribe((result) => {
      this.transacciones = result;
      this.tablaTrigger.next();
    });
  }
  ngOnDestroy(): void {
    //this.tablaTrigger.unsubscribe();
  }

  reload() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.transaccionService
        .getAllTransacciones()
        .subscribe((transacciones: any[]) => {
          this.transacciones = transacciones;
          this.tablaTrigger.next();
        });
    });
  }

  eliminarTransaccion(transaccion: Transaccion) {
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
    
    this.transaccionService.deleteTransaccion(transaccion).subscribe(
      (result)=>{  
       this.reload();
       this.swal.exitoso("Eliminado Correctamente");
      }
    )
  }
})

  }

  editarTransaccion(transaccion: Transaccion) {
    this.transaccion.descripcion = transaccion.descripcion;
    this.transaccion.idTransaccion = transaccion.idTransaccion;
    this.botonAbrir.nativeElement.click();
  }

  agregarTransaccion(transaccionForm: NgForm) {
    let msg;
    if (transaccionForm.valid) {
      if (transaccionForm.value.idTransaccion == '' || transaccionForm.value.idTransaccion == undefined){
        this.transaccionService
          .addTransaccion(this.transaccion)
          .subscribe((result) => {
            this.reload();
          });
        msg = 'Agregado correctamente';
      } else {
        this.transaccionService
          .editTransaccion(this.transaccion)
          .subscribe((result) => {
            this.reload();
          });
        msg = 'Actualizado correctamente';
      }
    }
    this.cerrarModal();
    this.transaccionForm.resetForm();
    this.swal.exitoso(msg);
  }

  public cerrarModal() {
    this.botonCerrar.nativeElement.click();
  }
}

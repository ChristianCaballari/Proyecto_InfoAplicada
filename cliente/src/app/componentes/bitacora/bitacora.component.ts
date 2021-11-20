import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {BitacoraService} from './../../servicios/bitacora.service'
import { DataTableDirective } from 'angular-datatables';
import { Bitacora } from 'src/app/modelo/Bitacora.model';
import { BitacoraFiltro } from 'src/app/modelo/Filtro.model';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit,OnDestroy {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  bitacora: Bitacora = {
      idBitacoraAuditoria: '',
      transaccion: '' ,  
      proyecto: '' ,
      fechaHora: '' ,
      nombre: '' ,
      apellidos: '' ,
  };

  filtro: BitacoraFiltro={
    mesInicio:'',
    mesFinal:''
  }
  meses:string[]=["Enero","Febrero","Marzo", "Abril","Mayo","Junio","Julio","Agosto","Setiembre","Octubre",
"Noviembre","Diciembre"];

  @ViewChild("filtroForm") filtroForm: NgForm;
  constructor(private bitacoraS: BitacoraService) { }

  dtOptions: any = {};
  bitacoras!: any[];
  tablaTrigger = new Subject<any>();

  ngOnInit(): void {
    this.obtenerBitacoras();
  }

  ngOnDestroy(): void {
  }

  obtenerBitacoras(){
    
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
          title:"Reporte Bitacora",
          text:'<i class="fas fa-file-excel fs-4"></i>',
          className: 'bg-success text-light rounded-3',
          filename: 'Reporte control de bitacoras',
          exportOptions: {
            columns: [0, 1, 2, 3, 4],
          },
        },
        {
          extend: 'pdfHtml5',
          titleAttr: 'Exportar a PDF',
          title:"Reporte Bitacora",
          text:'<i class="fas fa-file-pdf fs-4"></i>',
          className: 'bg-danger text-light rounded-3',
          filename: 'Reporte control de bitacoras',
          exportOptions: {
            columns: [0, 1, 2, 3, 4],
          },
          
        },
      ],
    };
      this.bitacoraS.getAllBitacoras().subscribe((res)=>{
      this.bitacoras=res;
      this.tablaTrigger.next();
     });
  }



  filtroB(filtroForm: NgForm){

  
    if(filtroForm.valid){
      this.filtro= filtroForm.value;
     

      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
     this.bitacoraS.getBitacorasFiltro(this.filtro).subscribe(
       (result)=>{
         this.bitacoras=result; 
         this.tablaTrigger.next();
       }
     
       )
     }
      )};
   }


}

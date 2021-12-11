import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {BitacoraService} from './../../servicios/bitacora.service'
import { DataTableDirective } from 'angular-datatables';
import { Bitacora } from 'src/app/modelo/Bitacora.model';
import { BitacoraFiltro } from 'src/app/modelo/Filtro.model';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { forEach } from 'jszip';
import { ThisReceiver } from '@angular/compiler';


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
    mesFinal:'0'
  }
  meses:string[]=["Enero","Febrero","Marzo", "Abril","Mayo","Junio","Julio","Agosto","Setiembre","Octubre",
"Noviembre","Diciembre"];

 meses1 =[
  {"name":"Enero","value":1,"activo":false},
  {"name":"Febrero","value":2,"activo":false},
  {"name":"Marzo","value":3,"activo":false},
  {"name":"Abril","value":4,"activo":false},
  {"name":"Mayo","value":5,"activo":false},
  {"name":"Junio","value":6,"activo":false},
  {"name":"Julio","value":7,"activo":false},
  {"name":"Agosto","value":8,"activo":false},
  {"name":"Setiembre","value":9,"activo":false},
  {"name":"Octubre","value":10,"activo":false},
  {"name":"Noviembre","value":11,"activo":false},
  {"name":"Diciembre","value":12,"activo":false}
]





primerMesSelected:number = 1;
segundoMesSelected:number = 1;
mesSelected:number =1;
fechaInicio: any;
fechaFinal: any;
isDisabled:any=false;

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
      sort:false,
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
          customize: function(doc) {
            doc.content[1].margin = [ 60, 10, 50, 10 ] //left, top, right, bottom
          }
          
        },
      ],
    };
      this.bitacoraS.getAllBitacoras().subscribe((res)=>{
      this.bitacoras=res;
      this.tablaTrigger.next();
     });
  }

  reload(){

    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    
      dtInstance.destroy();

    this.bitacoraS.getAllBitacoras().subscribe((res)=>{
      this.bitacoras=res;
      this.tablaTrigger.next();
     });
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
         
         this.bitacoras=result ;
         console.log(this.bitacoras); 
         this.tablaTrigger.next();
       }
     
       )
     }
      )};
   }

   validarMeses(){
    this.fechaInicio=((document.getElementById("mesInicio") as HTMLInputElement).value);
    this.fechaFinal=((document.getElementById("mesFinal") as HTMLInputElement).value);

    if( this.fechaInicio>1){
     //this.isDisabled=true;
     
  
    }else{
      this.isDisabled=false;
    }
   }
   false(){
    for(let mes of this.meses1){
      mes.activo=false;
   }
   }
   validarRandoMes(){
    this.false();
     console.log(this.mesSelected);
     let cont= 0;
    for(let mes of this.meses1){
       if(cont<this.mesSelected){
           mes.activo=true;
       }
      cont++;
    }
   }
}

import { Swal2 } from 'src/app/mensajes/mensajes';
import { AvanceDetetalle } from './../../modelo/Avance.model';
import { SolicitudService } from './../../servicios/solicitud.service';
import { TrimestreService } from './../../servicios/trimestre.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Avance } from 'src/app/modelo/Avance.model';
import { AvanceService } from './../../servicios/avance.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-avance',
  templateUrl: './avance.component.html',
  styleUrls: ['./avance.component.css'],

})
export class AvanceComponent implements OnInit,OnDestroy {
@ViewChild(DataTableDirective, { static: false })
dtableElement: DataTableDirective;
  avance: Avance = {
    idAvance: '',
    idTrimestre: '',
    idUsuarioAplicativo:'',
    idSolicitud: '',
    documento: '',
};
selectSolicitud:boolean = false;
selectTrimestre:boolean = false;

@ViewChild('avanceForm') avanceForm: NgForm;
@ViewChild('botonAbrir') botonAbrir: ElementRef;
@ViewChild('botonCerrar') botonCerrar: ElementRef;


dtOptions: any = {};
//dtOptions: DataTables.Settings = {};
avances:  AvanceDetetalle[];

pdf64:string;

trimestres!:any[];
tablaTrigger = new Subject<any>();
trimestresSelected:Number;
solicitudSelected:Number;

solicitudes!: any[];
data:any={
  idTrimestre:'5',
  descripcion :"Seleccione el Trimestre"
}
dataSolicitud:any={
  idSolicitud: '0',
  nombre :"Seleccione la Solicitud"
}
number:number = 5;
permitido:boolean = true;
pdf:any;
  constructor(private avanceService:AvanceService,private  trimestreService : TrimestreService,
    private solicitudService:SolicitudService, private swal:Swal2) { }

  ngOnInit(): void {

  
   this.obtenerTrimestres();
   this.getAllSolicitudTI();
   this.obtenerAvances();
  }


  agregarAvance(avanceForm:NgForm){
    this.avance.documento =this.pdf;
    this.avance.idUsuarioAplicativo = localStorage.getItem("idFuncionario")?.toString();
    console.log(this.avance);

    
    if(this.avance.idAvance == ''){

      this.avanceService.addAvance(this.avance).subscribe(
        (result) =>{
         this.reload();
         this.swal.exitoso("Agregado Exitosamente");
        }
      )
    }else{
      this.avanceService.updateAvance(this.avance).subscribe(
        (result) =>{
          this.reload();
          this.swal.exitoso("Actualizado Exitosamente");
        }
      )
    }
    this.cerrarModal();
  }

  onFileChanged(e: any) {
    this.pdf = e[0].base64 
  }
  validarSelect(e: any){

    if(this.avance.idSolicitud == '0' || this.avance.idSolicitud == ''){
      this.selectSolicitud = false;
    }else{
      this.selectSolicitud = true;
    }
  }
  validarSelectTrimestre(){
    if(this.avance.idTrimestre == '5' || this.avance.idTrimestre == ''){
        this.selectTrimestre = false;
    }else{
      this.selectTrimestre = true;
    }
    console.log(this.selectTrimestre);
  }
  
  getAllSolicitudTI(){
    this.solicitudService.getAllSolicitudTI().subscribe(
      (result) =>{
       
        this.solicitudes = result;
        this.solicitudes.unshift(this.dataSolicitud);
        this.solicitudSelected=0;
        console.log(this.solicitudes);
      }
    )
  }
  
  showPdf(pdf:any) {
   
    const linkSource = pdf;
    const downloadLink = document.createElement("a");
    
    const fileName = "DocumentoAvance.pdf";
        downloadLink.href = linkSource;
         //downloadLink = fileName;
        window.open(downloadLink.href)
      //  downloadLink.click();

  //  console.log(this.pdf);
}



  obtenerTrimestres(){
    this.trimestreService.getAllTrimestres().subscribe(
      (result) =>{
        this.trimestres = result;
        this.trimestres.push(this.data);
        this.trimestresSelected=5;
      }
    )
  }
  ngOnDestroy(): void{
    this.tablaTrigger.unsubscribe();
  }

  VerDocumento(avance:AvanceDetetalle){
    console.log(avance);
    this.avanceService.getDocumento(avance).subscribe(
      (result) =>{
        this.pdf64 = result[0].documento;

        console.log(this.pdf64);
        this.showPdf(this.pdf64);
      }
    )
  }
  vo(){
    alert("hola");
  }
  obtenerAvances(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      sort:false,
      pageLength: 6,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json',
      },
      processing: true,
      dom: 'Bfrtip',
      buttons: [
      
        {
          extend: 'excelHtml5', 
          
          title:"Reporte de Avances",
          text:'<i class="fas fa-file-excel fs-4"></i>',
          className: 'bg-success text-light rounded-3',
          filename: 'Reporte de Avances',
          exportOptions: {
            columns: [0, 1, 2, 3],
          },
        },
        {
          extend: 'pdfHtml5',
          titleAttr: 'Exportar a PDF',
          title:"Reporte de Avances",
          text:'<i class="fas fa-file-pdf fs-4"></i>',
          className: 'bg-danger text-light rounded-3',
          filename: 'Reporte de Avances',
          exportOptions: {
            columns: [0, 1, 2, 3],
          },
          
        },
      ],
    };
   this.avanceService.getAllAvances().subscribe(
    (result) =>{
      this.avances = result as AvanceDetetalle[];
      this.tablaTrigger.next();
    }
   ) 
  }

  avanceTrimestral(){
    this.dtableElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.destroy();
    this.avanceService.getAvancesTrimestrales().subscribe(
      (result) =>{
        this.avances =  result;
        this.tablaTrigger.next();  
      }
      )
       
    }); 
  }

  reload() {
    this.dtableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.avanceService.getAllAvances().subscribe(
        (result) =>{
          this.avances = result;
          this.tablaTrigger.next();
        }
      )
       
    });
  }

  editarAvance(avance:AvanceDetetalle){
   this.avanceService.getAvanceUpdate(avance).subscribe(
     (result) =>{
      this.avance.idAvance = result[0].idAvance;
      this.avance.idTrimestre = result[0].idTrimestre,
      this.avance.idSolicitud = result[0].idSolicitud;  
     }
   )
 this.botonAbrir.nativeElement.click();
  }
  eliminarAvance(avance:AvanceDetetalle){
   
      Swal.fire({
        title: 'Estas Seguro de Eliminar el Siguiente Avance?',
        text: `Acción Irreversible`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
      }).then((result) => {
        if (result.isConfirmed) {
  
          this.avanceService.deleteAvance(avance).subscribe(
            (result)=>{
              this.reload();
            }
          )
          this.swal.exitoso("Avance eliminado");
        }
      });
      return;
    }
    private cerrarModal(){
      this.avance.documento='';
      this.avance.fechaHora='';
      this.avance.idAvance='';
      this.avance.idSolicitud='';
      this.avance.idTrimestre='';
      this.avance.idUsuarioAplicativo='';
      this.botonCerrar.nativeElement.click();
    }
}

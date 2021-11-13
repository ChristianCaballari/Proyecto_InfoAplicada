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

@ViewChild('avanceForm') avanceForm: NgForm;
@ViewChild('botonAbrir') botonAbrir: ElementRef;
@ViewChild('botonCerrar') botonCerrar: ElementRef;


dtOptions: DataTables.Settings = {};
avances: AvanceDetetalle[];

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
  idSolicitud:'0',
  nombre :"Seleccione la Solicitud"
}
number:number = 5;
permitido:boolean = true;
pdf:any;
  constructor(private avanceService:AvanceService,private  trimestreService : TrimestreService,
    private solicitudService:SolicitudService, private swal:Swal2) { }

  ngOnInit(): void {

   this.obtenerAvances();
   this.obtenerTrimestres();
   this.getAllSolicitudTI();
  }


  agregarAvance(avanceForm:NgForm){
    this.avance.documento =this.pdf;
    this.avance.idUsuarioAplicativo = localStorage.getItem("idFuncionario")?.toString();
    this.avance.idUsuarioAplicativo  ='148';
    console.log(this.avance);

      this.avanceService.addAvance(this.avance).subscribe(
        (result) =>{
         this.reload();
         this.swal.exitoso("Agregado Exitosamente");
        }
      )
  }

  onFileChanged(e: any) {
    this.pdf = e[0].base64 
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
  obtenerAvances(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json',
      },
    };
   this.avanceService.getAllAvances().subscribe(
    (result) =>{
      this.avances = result as AvanceDetetalle[];
      console.log(this.avances[0].nombre);
      console.log(this.avances[0].apellidos);
      console.log(this.avances[0].descripcion);
      console.log(this.avances[0].fechaHora);
      console.log(this.avances[0].idAvance);
      console.log(this.avances[0].idSolicitud);
      console.log(this.avances);
      this.tablaTrigger.next();
    }
   )
    
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
}

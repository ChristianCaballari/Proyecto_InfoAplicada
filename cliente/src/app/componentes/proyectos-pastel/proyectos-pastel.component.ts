import { SolicitudService } from './../../servicios/solicitud.service';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-proyectos-pastel',
  templateUrl: './proyectos-pastel.component.html',
  styleUrls: ['./proyectos-pastel.component.css']
})
export class ProyectosPastelComponent implements OnInit {

  constructor(private solicitudService:SolicitudService) {

   }
   single: any= [];
  ngOnInit(): void {
    this.optenerProyectos();
  }

  optenerProyectos(){
   this.solicitudService.getAllPendienteCancelados().subscribe(
     (result)=>{
       console.log(result);
       this.single = result;
     }
   )
  }
  view: any[number] = [700, 400];

   // options
   gradient: boolean = true;
   showLegend: boolean = true;
   showLabels: boolean = true;
   isDoughnut: boolean = false;
   maxLabelLength: number = 20;
   trimLabels: boolean = true;
   legendTitle: string = 'Proyectos';
   legendPosition: any = 'right';

  colorScheme:any= {
    domain: ['#C7B42C', '#5AA454', '#A10A28']
  };

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  downloadPDF() {
    // Extraemos el
    const DATA: any = document.getElementById('htmlData1');
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.text('Reportes Proyectos', 180,20);
    const options = {
      background: 'white',
      scale: 3,
    };
    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');
        // Add image Canvas to PDF
        const bufferX = 30;
        const bufferY = 30;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2* bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );
        return doc;
      })
      .then((docResult) => {
        docResult.save(`Reporte_Proyectos`);
      });
  }

}

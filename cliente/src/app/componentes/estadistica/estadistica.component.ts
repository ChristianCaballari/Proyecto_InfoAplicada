import { AvanceService } from './../../servicios/avance.service';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

   single: any= [
   ]

  view: any[number] = [800, 300];

  // options
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  autoScale=true;
  xAxisLabel = 'Proyectos';
  showYAxisLabel = true;
  yAxisLabel = 'Avances';
  legendPosition: any = 'below';
  legendTitle: any = 'Avances Proyectos'

  colorScheme :any= {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  constructor(private avanceService:AvanceService) { 
    //Object.assign(this, {this.single})   
  }

  ngOnInit(): void {
    console.log(this.single);
    this.obtenerAllAvancesProyectos();
  }

  downloadPDF() {
    // Extraemos el
    const DATA: any = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.text('Reportes Avances Proyectos', 180,20);
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
        const pdfWidth = doc.internal.pageSize.getWidth() - 1 * bufferX;
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
        docResult.save(`Reporte_Avances Proyectos`);
      });
  }

  obtenerAllAvancesProyectos(){
    this.avanceService.getAllAvanceProyectos().subscribe(
      (result) =>{
        console.log(result);
        this.single = result;
      }
    )
  }

  onSelect(event:any) {
    console.log(event);
  }

}

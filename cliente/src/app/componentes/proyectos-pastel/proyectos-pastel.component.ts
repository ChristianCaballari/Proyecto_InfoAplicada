import { SolicitudService } from './../../servicios/solicitud.service';
import { Component, OnInit } from '@angular/core';

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
  legendPosition: any = 'below';

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

}

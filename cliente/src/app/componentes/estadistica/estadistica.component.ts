import { AvanceService } from './../../servicios/avance.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

   single: any= [
    // {
    //   "name": "Germany",
    //   "value": 1
    // },
    // {
    //   "name": "USA",
    //   "value": 2
    // },
    // {
    //   "name": "France",
    //   "value": 3
    // },
    // {
    //   "name": "Costa Rica",
    //   "value": 2
    // }
  ];
  
// multi = [
//     {
//       "nombre": "Germany",
//       "series": [
//         {
//           "name": "2010",
//           "value": 7300000
//         },
//         {
//           "name": "2011",
//           "value": 8940000
//         }
//       ]
//     },
  
//     {
//       "nombre": "USA",
//       "series": [
//         {
//           "name": "2010",
//           "value": 7870000
//         },
//         {
//           "name": "2011",
//           "value": 8270000
//         }
//       ]
//     },
  
    // {
    //   "name": "France",
    //   "series": [
    //     {
    //       "name": "2010",
    //       "value": 5000002
    //     },
    //     {
    //       "name": "2011",
    //       "value": 5800000
    //     }
    //   ]
    // },
     
    // {
    //   "name": "Costa Rica",
    //   "series": [
    //     {
    //       "name": "2089",
    //       "value": 5000002
    //     },
    //     {
    //       "name": "2011",
    //       "value": 5800000
    //     }
    //   ]
    // },
  // ];

  view: any[number] = [800, 300];

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

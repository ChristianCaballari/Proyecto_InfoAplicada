import { Trimestre } from './../../modelo/Trimestre.model';
import { TrimestreService } from './../../servicios/trimestre.service';
import { Component, OnInit,ViewChild,OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit,OnDestroy {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  constructor(private trimestreService: TrimestreService) { }

  dtOptions: any = {};
  tablaTrigger = new Subject<any>();
  trimestres!: any[];

  ngOnInit(): void {
    this.obtenerTrimestres();
  }

  ngOnDestroy(): void{
    //this.tablaTrigger.unsubscribe();
  }
  obtenerTrimestres(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      language:{
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json'
      }
    };

    this.trimestreService.getAllTrimestres().subscribe(
      (result) =>{
       this.trimestres = result;
       this.tablaTrigger.next();
      }
    )
  }
  reload(){

    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    
      dtInstance.destroy();

      this.trimestreService.getAllTrimestres().subscribe(
        (result) =>{
         this.trimestres = result;
        }
      )
  });
}
  eliminarTrimestre(trimestre:Trimestre){

  }

  editarTrimestre(trimestre:Trimestre){

  }
}

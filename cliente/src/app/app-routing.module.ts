import { MantenimientoTransaccionComponent } from './componentes/mantenimiento-transaccion/mantenimiento-transaccion.component';
import { MantenimientoComponent } from './componentes/mantenimiento/mantenimiento.component';
import { ProyectosPastelComponent } from './componentes/proyectos-pastel/proyectos-pastel.component';
import { EstadisticaComponent } from './componentes/estadistica/estadistica.component';
import { DepartamentoComponent } from './componentes/departamento/departamento.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardianGuard } from './guards/guardian.guard';
import { SolicitudComponent } from './componentes/solicitud/solicitud.component';
import { AvanceComponent } from './componentes/avance/avance.component';
import { BitacoraComponent } from './componentes/bitacora/bitacora.component';
import { MantenimientoSexoComponent } from './componentes/mantenimiento-sexo/mantenimiento-sexo.component';

const routes: Routes = [
  {path: '',redirectTo:'/login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent,/*canActivate:[GuardianGuard]*/},
  {path: 'login', component: LoginComponent },
 {path: 'departamento', component: DepartamentoComponent,/*canActivate:[GuardianGuard]*/},
 // {path: 'departamento', component: DepartamentoComponent},
  {path: 'departamento/editar/:id', component: DepartamentoComponent},
  {path: 'solicitud', component: SolicitudComponent,/*canActivate:[GuardianGuard]*/},
  {path: 'avance', component: AvanceComponent,/*canActivate:[GuardianGuard]*/},
  {path: 'bitacora', component: BitacoraComponent},
  {path: 'estadistica', component: EstadisticaComponent,/*canActivate:[GuardianGuard]*/},
  {path: 'pastel', component: ProyectosPastelComponent,/*canActivate:[GuardianGuard]*/},
  {path: 'mantenimiento', component: MantenimientoComponent,/*canActivate:[GuardianGuard]*/},
  {path: 'mantenimientoSexo', component: MantenimientoSexoComponent,/*canActivate:[GuardianGuard]*/},
  {path: 'mantenimientoTransaccion', component: MantenimientoTransaccionComponent,/*canActivate:[GuardianGuard]*/},
  //{path: '**', component: PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }

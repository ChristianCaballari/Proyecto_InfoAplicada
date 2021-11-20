import { Swal2 } from './mensajes/mensajes';
import { GuardianGuard } from './guards/guardian.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FormsModule } from '@angular/forms';


import { HttpClientModule} from '@angular/common/http';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './componentes/home/home.component';
import { FuncionariosComponent } from './componentes/funcionarios/funcionarios.component';
import { FuncionarioService } from './servicios/funcionario.service';
import { LoginService } from './servicios/login.service';
import { DepartamentoComponent } from './componentes/departamento/departamento.component';
import { DepartamentoService } from './servicios/departamento.service';
import { DataTablesModule } from "angular-datatables";
import { SolicitudComponent } from './componentes/solicitud/solicitud.component';
import { SolicitudService } from './servicios/solicitud.service';
import { SexoService } from './servicios/sexoService';
import { AvanceService } from './servicios/avance.service';
import { AvanceComponent } from './componentes/avance/avance.component';
import { TrimestreService } from './servicios/trimestre.service';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import {BitacoraService} from './servicios/bitacora.service'
import { BitacoraComponent } from './componentes/bitacora/bitacora.component';
import { ProyectosPastelComponent } from './componentes/proyectos-pastel/proyectos-pastel.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    FuncionariosComponent,
    DepartamentoComponent,
    SolicitudComponent,
    AvanceComponent,
    BitacoraComponent,
    ProyectosPastelComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    AlifeFileToBase64Module,
      FormsModule,
      NgbModule
  ],
  providers: [LoginService,FuncionarioService,DepartamentoService,/*GuardianGuard,*/Swal2,SolicitudService,SexoService,AvanceService,TrimestreService,BitacoraService],
  bootstrap: [AppComponent]
})
export class AppModule { }

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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    FuncionariosComponent,
    DepartamentoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
      FormsModule,
      NgbModule
  ],
  providers: [LoginService,FuncionarioService,DepartamentoService,GuardianGuard,Swal2],
  bootstrap: [AppComponent]
})
export class AppModule { }

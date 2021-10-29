import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FormsModule } from '@angular/forms';


import { FlashMessagesModule} from 'angular2-flash-messages';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './componentes/home/home.component';
import { FuncionariosComponent } from './componentes/funcionarios/funcionarios.component';
import { FuncionarioService } from './servicios/funcionario.service';
import { LoginService } from './servicios/login.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    FuncionariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      FormsModule,
      FlashMessagesModule.forRoot(),
  
      NgbModule
  ],
  providers: [LoginService,FuncionarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }

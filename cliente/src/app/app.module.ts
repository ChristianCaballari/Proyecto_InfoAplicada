import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { HeaderComponent } from './componentes/header/header.component';
import { LoginService } from './servicios/login.service';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule} from 'angular2-flash-messages';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { DepartamentoComponent } from './componentes/departamento/departamento.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardianGuard } from './guards/guardian.guard';

const routes: Routes = [
  {path: '',redirectTo:'/login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent,canActivate:[GuardianGuard] },
  {path: 'login', component: LoginComponent },
  {path: 'departamento', component: DepartamentoComponent, canActivate:[GuardianGuard]},
  //{path: '**', component: PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventosComponent } from './eventos/eventos.component';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContatosComponent } from './contatos/contatos.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AuthGuard } from './auth/auth.guard';
import { EventoEditComponent } from './eventos/eventoEdit/eventoEdit.component';


const routes: Routes = [
  {path: 'user', component: UserComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegistrationComponent}
    ]},
  
  //O canActivate: [AuthGuard] bloquei o acesso sem estar logado.
  //Está configurado na pasta auth.guard.ts
  {path: 'eventos', component: EventosComponent, canActivate: [AuthGuard]},
  {path: 'evento/:id/edit', component: EventoEditComponent, canActivate: [AuthGuard]},
  {path: 'palestrantes', component: PalestrantesComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'contatos', component: ContatosComponent, canActivate: [AuthGuard]},
  //Caso nenhuma rota for atribuida no endereço, será redirecionado para o dashboard.
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  //Se qualquer rota no endereço não iver dado match nas rotas a cima, será redirecionado para o dashboard.
  {path: '**',  redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

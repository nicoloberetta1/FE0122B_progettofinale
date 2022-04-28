import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormClientiComponent } from './components/form-clienti/form-clienti.component';
import { FormFattureComponent } from './components/form-fatture/form-fatture.component';
import { HomeComponent } from './components/home/home.component';
import { ListaClientiComponent } from './components/lista-clienti/lista-clienti.component';
import { ListaFattureComponent } from './components/lista-fatture/lista-fatture.component';
import { ListaUtentiComponent } from './components/lista-utenti/lista-utenti.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'signup',
        component: SignupComponent,
    },
    {
        path: 'lista-utenti',
        component: ListaUtentiComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'lista-clienti',
        component: ListaClientiComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'lista-fatture',
        component: ListaFattureComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'form-fatture/:id',
        component: FormFattureComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'form-fatture/:id/:idCliente',
        component: FormFattureComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'form-clienti',
        component: FormClientiComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'form-clienti/:id',
        component: FormClientiComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'fatture-cliente/:id',
        component: ListaFattureComponent,
        canActivate: [AuthGuard],
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

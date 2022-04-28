import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaUtentiComponent } from './components/lista-utenti/lista-utenti.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ListaFattureComponent } from './components/lista-fatture/lista-fatture.component';
import { ListaClientiComponent } from './components/lista-clienti/lista-clienti.component';
import { FormClientiComponent } from './components/form-clienti/form-clienti.component';
import { FormFattureComponent } from './components/form-fatture/form-fatture.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        NavbarComponent,
        HomeComponent,
        ListaUtentiComponent,
        ListaFattureComponent,
        ListaClientiComponent,
        FormClientiComponent,
        FormFattureComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

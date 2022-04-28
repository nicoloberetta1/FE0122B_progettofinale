import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    constructor(private router: Router, private authService: AuthService) {}

    isLogged: any;

    ngOnInit(): void {
        this.isLogged = localStorage.getItem('utente');
    }

    utenteLoggato(): boolean {
        return localStorage.getItem('utente') != null;
    }

    logOut() {
        this.authService.logOut();
    }
}

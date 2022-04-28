import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-lista-utenti',
    templateUrl: './lista-utenti.component.html',
    styleUrls: ['./lista-utenti.component.scss'],
})
export class ListaUtentiComponent implements OnInit {
    utenti!: Array<User>;
    paginaCorr: any;
    response: any;
    numeroPag: any;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.getAllusers();
    }

    getAllusers() {
        this.authService.getAll(0).subscribe((c) => {
            this.response = c;

            this.utenti = this.response.content;
            const numPag = Array(this.response.totalPages);
            this.numeroPag = numPag;
        });
    }

    cambiaPagina(p: number) {
        this.authService.getAll(p).subscribe((c) => {
            this.response = c;
            this.utenti = this.response.content;
            this.paginaCorr = p;
        });
    }

    counter(i: number) {
        return new Array(i);
    }

    // PAGINATION

    public pageNumber: number = 0;
    public get pageNumberText() {
        return this.pageNumber + 1;
    }

    previousPage() {
        if (this.pageNumber > 0) {
            this.pageNumber--;
            this.getAllusers();
        }
    }

    nextPage() {
        this.pageNumber++;
        this.getAllusers();
    }
}

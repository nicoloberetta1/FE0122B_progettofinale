import { Component, OnInit } from '@angular/core';

import { Clienti } from 'src/app/models/clienti';
import { ClientiService } from 'src/app/services/clienti.service';

@Component({
    selector: 'app-lista-clienti',
    templateUrl: './lista-clienti.component.html',
    styleUrls: ['./lista-clienti.component.scss'],
})
export class ListaClientiComponent implements OnInit {
    clienti!: Clienti[];
    response: any;
    paginaCorr: number = 0;
    numeroPag!: any;

    constructor(private clientiService: ClientiService) {}

    ngOnInit(): void {
        this.getAllclients();
    }

    getAllclients() {
        this.clientiService.getAll(0).subscribe((c) => {
            this.response = c;
            this.clienti = this.response.content;
            const numeroPag = Array(this.response.totalPages);
            this.numeroPag = numeroPag;
        });
    }

    cambiaPagina(pagina: number) {
        this.clientiService.getAll(pagina).subscribe((p) => {
            this.response = p;
            this.clienti = this.response.content;
            this.paginaCorr = pagina;
        });
    }

    eliminaCliente(id: number, i: number, rag: string) {
        if (confirm(`Sei sicuro di voler eliminare ${rag}`)) {
            this.clientiService.deleteCliente(id).subscribe(() => {
                this.clienti.splice(i, 1);
            });
        }
    }
}

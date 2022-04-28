import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fatture } from 'src/app/models/fatture';
import { FattureService } from 'src/app/services/fatture.service';

@Component({
    selector: 'app-lista-fatture',
    templateUrl: './lista-fatture.component.html',
    styleUrls: ['./lista-fatture.component.scss'],
})
export class ListaFattureComponent implements OnInit {
    fatture!: Fatture[];
    idCliente!: number;
    response: any;

    constructor(
        private fattureService: FattureService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.idCliente = +params['id'];
            this.caricaFatture();
        });
    }

    caricaFatture() {
        if (this.idCliente) {
            this.fattureService
                .getFatturbyCliente(this.idCliente, 0)
                .subscribe((c) => {
                    this.response = c;
                    this.fatture = c.content;
                });
        } else {
            this.fattureService.getAll(0).subscribe((c) => {
                this.response = c;
                this.fatture = c.content;
            });
        }
    }

    cambiaPagina(p: number) {
        if (this.idCliente) {
            this.fattureService
                .getFatturbyCliente(this.idCliente, p)
                .subscribe((c) => {
                    this.response = c;
                    this.fatture = c.content;
                });
        } else {
            this.fattureService.getAll(p).subscribe((c) => {
                this.response = c;
                this.fatture = c.content;
            });
        }
    }

    eliminaFatture(id: number, i: number, num: number) {
        if (confirm(`Sei sicuro di voler eliminare la fattura ${num}`))
            this.fattureService.deleteFatture(id).subscribe(() => {
                this.fatture.splice(i, 1);
            });
    }
}

import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fatture } from 'src/app/models/fatture';
import { StatiFattura } from 'src/app/models/stati-fattura';
import { FattureService } from 'src/app/services/fatture.service';
import { StatiFatturaService } from 'src/app/services/stati-fattura.service';

@Component({
    selector: 'app-form-fatture',
    templateUrl: './form-fatture.component.html',
    styleUrls: ['./form-fatture.component.scss'],
})
export class FormFattureComponent implements OnInit {
    disabledValue = false;
    statiFatture!: StatiFattura[];
    id!: number;
    idCliente!: number;
    fatture!: Fatture;
    formGroup: FormGroup = this.formBuilder.group({
        data: new FormControl('', [Validators.required]),
        numero: new FormControl('', [Validators.required]),
        anno: new FormControl('', [Validators.required]),
        importo: new FormControl('', [Validators.required]),
        stato: new FormControl(''),
    });

    constructor(
        private fattureService: FattureService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private statiFatturaService: StatiFatturaService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.id = +params['id'];
            this.idCliente = +params['idCliente'];

            this.formGroup;
            this.caricaDati();
        });

        this.caricaStatoFattura();
    }

    onSubmit(datiForm: {
        value: {
            data: string;
            numero: number;
            anno: number;
            importo: number;
            stato: number;
        };
    }) {
        if (!this.id) {
            this.id = 0;
            this.fatture = {
                id: 0,
                numero: 0,
                anno: 0,
                data: '',
                importo: 0,
                stato: { id: 0, nome: '' },
                cliente: {},
            };
        }
        this.fatture.id = this.id;
        this.fatture.data = datiForm.value.data;
        this.fatture.numero = datiForm.value.numero;
        this.fatture.anno = datiForm.value.anno;
        this.fatture.importo = datiForm.value.importo;
        this.fatture.stato.id = datiForm.value.stato;
        if (this.idCliente) {
            this.fatture.cliente.id = this.idCliente;
        }
        this.fattureService
            .saveFatture(this.id, this.fatture)
            .subscribe((res) => {
                this.router.navigate(['/lista-fatture']);
            });
    }

    caricaDati() {
        if (this.id !== 0) {
            this.disabledValue = true;
            this.fattureService.getFatturebyId(this.id).subscribe((data) => {
                this.fatture = data;
                console.log(data);
                this.fatture.data = this.fatture.data.substr(0, 10);
                this.formGroup.patchValue({
                    data: this.fatture.data,
                    numero: this.fatture.numero,
                    anno: this.fatture.anno,
                    importo: this.fatture.importo,
                    stato: this.fatture.stato.id,
                });
            });
        }
    }

    caricaStatoFattura() {
        this.statiFatturaService.recuperaStatiFattura().subscribe((res) => {
            this.statiFatture = res.content;
        });
    }
}

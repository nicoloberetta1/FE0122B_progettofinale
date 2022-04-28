import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Clienti } from 'src/app/models/clienti';
import { Comune } from 'src/app/models/comune';
import { Provincia } from 'src/app/models/provincia';
import { ClientiService } from 'src/app/services/clienti.service';
import { ComuneService } from 'src/app/services/comune.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { Route, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-form-clienti',
    templateUrl: './form-clienti.component.html',
    styleUrls: ['./form-clienti.component.scss'],
})
export class FormClientiComponent implements OnInit {
    formGroup!: FormGroup;
    id!: number;
    cliente!: Clienti;
    tipoCliente!: any[];
    comune!: Comune[];
    provincia!: Provincia[];

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private clientiService: ClientiService,
        private comuneService: ComuneService,
        private provinciaService: ProvinciaService,
        private route: ActivatedRoute
    ) {}

    onSubmit(datiForm: {
        value: { indirizzoSedeOperativa: { comune: Comune } };
    }) {
        this.comune.forEach((item) => {
            if (item.id == datiForm.value.indirizzoSedeOperativa.comune.id) {
                datiForm.value.indirizzoSedeOperativa.comune = item;
            }
        });
        this.clientiService
            .saveCliente(this.id, datiForm.value)
            .subscribe((res) => {
                this.router.navigate(['/lista-clienti']);
            });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.id = +params['id'];

            this.formInit();
            this.caricaDati();
        });
    }

    formInit() {
        this.formGroup = this.formBuilder.group({
            ragioneSociale: new FormControl('', [Validators.required]),
            partitaIva: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            tipoCliente: new FormControl('', [Validators.required]),
            pec: new FormControl(''),
            telefono: new FormControl(''),
            nomeContatto: new FormControl(''),
            cognomeContatto: new FormControl(''),
            telefonoContatto: new FormControl(''),
            emailContatto: new FormControl('', [
                Validators.required,
                Validators.email,
            ]),
            indirizzoSedeOperativa: this.formBuilder.group({
                via: new FormControl(''),
                civico: new FormControl(''),
                cap: new FormControl(''),
                localita: new FormControl(''),
                comune: this.formBuilder.group({
                    id: new FormControl('', Validators.required),
                    nome: '',
                    provincia: {},
                }),
            }),
        });
    }

    caricaDati() {
        if (this.id !== 0) {
            this.clientiService.getClientebyId(this.id).subscribe((data) => {
                console.log(data);
                this.cliente = data;
                this.formGroup.patchValue({
                    ragioneSociale: this.cliente.ragioneSociale,
                    partitaIva: this.cliente.partitaIva,
                    email: this.cliente.email,
                    tipoCliente: this.cliente.tipoCliente,
                    pec: this.cliente.pec,
                    telefono: this.cliente.telefono,
                    nomeContatto: this.cliente.nomeContatto,
                    cognomeContatto: this.cliente.cognomeContatto,
                    telefonoContatto: this.cliente.telefonoContatto,
                    emailContatto: this.cliente.emailContatto,
                    indirizzoSedeOperativa: {
                        via: this.cliente.indirizzoSedeOperativa.via,
                        civico: this.cliente.indirizzoSedeOperativa.civico,
                        cap: this.cliente.indirizzoSedeOperativa.cap,
                        localita: this.cliente.indirizzoSedeOperativa.localita,
                    },
                });
            });
        }
        this.provinciaService
            .recuperaProvincia(0)
            .subscribe((res) => (this.provincia = res.content));
        this.comuneService
            .recuperaComune()
            .subscribe((res) => (this.comune = res.content));
        this.clientiService.getTipoCliente().subscribe((res) => {
            this.tipoCliente = res;
        });
    }
}

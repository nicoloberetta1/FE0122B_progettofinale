import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    formGroup!: FormGroup;
    utente!: User;
    item: any;

    constructor(private authService: AuthService, private router: Router) {}

    onSubmit(form: any) {
        console.log(form.value);
        this.item = form.value;
        this.authService.logIn(this.item).subscribe((res) => {
            this.utente = res;
            localStorage.setItem('utente', JSON.stringify(this.utente));
            alert('Benvenuto');
            this.router.navigate(['/lista-utenti']);
        });
    }

    ngOnInit(): void {
        this.controlloForm();
    }

    controlloForm() {
        this.formGroup = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
            ]),
        });
    }
}

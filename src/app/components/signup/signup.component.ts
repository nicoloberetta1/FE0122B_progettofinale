import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
    formGroup!: FormGroup;

    nuovoUtente = {
        username: '',
        password: '',
        email: '',
        role: [''],
    };

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.controlloForm();
    }

    onSubmit(form: any) {
        this.nuovoUtente.username = form.value.username;
        this.nuovoUtente.password = form.value.password;
        this.nuovoUtente.email = form.value.email;
        this.nuovoUtente.role.splice(0, 1);
        this.nuovoUtente.role.push(form.value.role);
        this.authService.signUp(this.nuovoUtente).subscribe((res) => {
            alert('Nuovo utente registrato correttamente');
            this.router.navigate(['/login']);
        });
    }

    controlloForm() {
        this.formGroup = new FormGroup({
            username: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
            ]),
            role: new FormControl(),
        });
    }
}

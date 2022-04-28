import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Route, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient, private router: Router) {}
    baseUrl = environment.pathApi;

    getAll(p: number) {
        return this.http.get<any>(
            `${environment.pathApi}/api/users?page=${p}&size=20&sort=id,ASC`
        );
    }

    logIn(data: any) {
        console.log(data);
        return this.http.post<any>(`${this.baseUrl}/api/auth/login`, data);
    }

    signUp(data: any) {
        console.log(data);
        return this.http.post<any>(`${this.baseUrl}/api/auth/signup`, data);
    }

    logOut() {
        localStorage.removeItem('utente');
        this.router.navigate(['/login']);
    }
}

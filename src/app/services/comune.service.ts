import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ComuneService {
    constructor(private http: HttpClient) {}

    baseUrl = environment.pathApi;

    recuperaComune() {
        return this.http.get<any>(
            `${this.baseUrl}/api/comuni?page=0&size=20&sort=id,ASC`
        );
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProvinciaService {


    constructor(private http: HttpClient) {}
    baseUrl = environment.pathApi;

    recuperaProvincia(p:number) {
        return this.http.get<any>(
            `${this.baseUrl}/api/province?page=${p}&size=20&sort=id,ASC`
        );
    }
}

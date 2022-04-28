import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class StatiFatturaService {
    constructor(private http: HttpClient) {}

    baseUrl = environment.pathApi;

    recuperaStatiFattura() {
        return this.http.get<any>(
            `${this.baseUrl}/api/statifattura?page=0&size=20&sort=id,ASC`
        );
    }
}

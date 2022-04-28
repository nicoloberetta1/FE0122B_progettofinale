import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ClientiService {
    constructor(private http: HttpClient) {}
    baseUrl = environment.pathApi;

    getAll(p: number) {
        return this.http.get<any>(
            `${this.baseUrl}/api/clienti?page=${p}&size=20&sort=id,ASC`
        );
    }

    getClientebyId(id: number) {
        return this.http.get<any>(`${this.baseUrl}/api/clienti/${id}`);
    }

    saveCliente(id: number, data: any) {
        if (!id) {
            return this.http.post<any>(`${this.baseUrl}/api/clienti/`, data);
        } else {
            return this.http.put<any>(
                `${this.baseUrl}/api/clienti/${id}`,
                data
            );
        }
    }

    deleteCliente(id: number) {
        return this.http.delete<boolean>(`${this.baseUrl}/api/clienti/${id}`);
    }

    getTipoCliente() {
        return this.http.get<any>(`${this.baseUrl}/api/clienti/tipicliente`);
    }
}

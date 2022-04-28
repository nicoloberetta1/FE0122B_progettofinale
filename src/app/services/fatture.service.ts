import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class FattureService {
    constructor(private http: HttpClient) {}
    baseUrl = environment.pathApi;

    getAll(p: number) {
        return this.http.get<any>(
            `${this.baseUrl}/api/fatture?page=${p}&size=20&sort=id,ASC`
        );
    }

    getFatturbyCliente(id: number,p:number) {
        return this.http.get<any>(
            `${this.baseUrl}/api/fatture/cliente/${id}?page=${p}&size=20&sort=id,ASC`
        );
    }

    getFatturebyId(id: number) {
        return this.http.get<any>(`${this.baseUrl}/api/fatture/${id}`);
    }


     saveFatture(id: number, data: any) {
         if (!id) {
             return this.http.post<any>(this.baseUrl + '/api/fatture', data);
         } else {
             return this.http.put<any>(
                 this.baseUrl + '/api/fatture/' + id,
                 data
             );
         }
     }

    deleteFatture(id: number) {
        return this.http.delete<boolean>(`${this.baseUrl}/api/fatture/${id}`);
    }
}

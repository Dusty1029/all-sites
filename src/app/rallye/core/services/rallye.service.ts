import { Injectable } from '@angular/core';
import { BaseService } from '@shared/services';
import { Observable } from 'rxjs';
import { CreateRallyeInterface, RallyeInterface } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class RallyeService extends BaseService<RallyeInterface, CreateRallyeInterface> {
    private readonly baseUrl = '/rallye';

    getRallyes(): Observable<RallyeInterface[]> {
        return this.getAll(this.baseUrl);
    }

    createRallye(createRallye: CreateRallyeInterface): Observable<string> {
        return this.create(this.baseUrl, createRallye);
    }

    getRallyeById(id: string): Observable<RallyeInterface> {
        return this.getById(`${this.baseUrl}/${id}`);
    }
}

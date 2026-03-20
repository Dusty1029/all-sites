import { Injectable } from '@angular/core';
import { format } from '@shared/helpers';
import { BaseService } from '@shared/services';
import { Observable } from 'rxjs';
import { CreateSpecialInterface, SpecialInterface } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class SpecialService extends BaseService<SpecialInterface, CreateSpecialInterface> {
    private readonly baseUrl = '/rallye/{id}/special';

    createSpecial(rallyeId: string, createSpecial: CreateSpecialInterface): Observable<string> {
        return this.create(format(this.baseUrl, { id: rallyeId }), createSpecial);
    }
}

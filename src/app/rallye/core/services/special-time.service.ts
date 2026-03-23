import { Injectable } from '@angular/core';
import { format } from '@shared/helpers';
import { BaseService } from '@shared/services';
import { Observable } from 'rxjs';
import {
    CreateSpecialTimeInterface,
    SpecialTimeInterface
} from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class SpecialTimeService extends BaseService<SpecialTimeInterface, CreateSpecialTimeInterface> {
    private readonly baseUrl = '/rallye/{rallyeId}/special/{specialId}/time';

    createSpecialTime(
        rallyeId: string,
        specialId: string,
        createSpecial: CreateSpecialTimeInterface,
    ): Observable<string> {
        return this.create(format(this.baseUrl, { rallyeId, specialId }), createSpecial);
    }
}

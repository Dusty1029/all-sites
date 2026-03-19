import { Injectable } from '@angular/core';
import { BaseService } from '@shared/services';
import { Observable } from 'rxjs';
import { CreateGageModel, GageModel } from '../models';

@Injectable({
    providedIn: 'root',
})
export class GageService extends BaseService<GageModel, CreateGageModel> {
    private readonly baseUrl = '/party/gages';

    getGages(): Observable<GageModel[]> {
        return this.getAll(this.baseUrl);
    }

    createGage(createGage: CreateGageModel): Observable<string> {
        return this.create(this.baseUrl, createGage);
    }
}

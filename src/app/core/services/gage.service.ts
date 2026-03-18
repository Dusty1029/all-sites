import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateGageModel, GageModel } from '../models';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root',
})
export class GageService extends BaseService<GageModel, CreateGageModel> {
    private readonly baseUrl = '/gages';

    getGages(): Observable<GageModel[]> {
        return this.getAll(this.baseUrl);
    }

    createGage(createGage: CreateGageModel): Observable<string> {
        return this.create(this.baseUrl, createGage);
    }
}

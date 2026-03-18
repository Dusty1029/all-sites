import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { CreatePlayerModel, PlayerModel } from '../models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PlayerService extends BaseService<PlayerModel, CreatePlayerModel> {
    private readonly baseUrl = '/players';

    getPlayers(): Observable<PlayerModel[]> {
        return this.getAll(this.baseUrl);
    }

    createPlayers(createPlayer: CreatePlayerModel): Observable<string> {
        return this.create(this.baseUrl, createPlayer);
    }
}

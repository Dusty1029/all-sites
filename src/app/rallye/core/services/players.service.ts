import { Injectable } from '@angular/core';
import { PlayerInterface } from '@shared/interfaces';
import { BaseService } from '@shared/services';
import { Observable } from 'rxjs';
import { CreatePlayerInterface } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class PlayerService extends BaseService<PlayerInterface, CreatePlayerInterface> {
    private readonly baseUrl = '/rallye/players';

    getPlayers(): Observable<PlayerInterface[]> {
        return this.getAll(this.baseUrl);
    }

    createPlayers(createPlayer: CreatePlayerInterface): Observable<string> {
        return this.create(this.baseUrl, createPlayer);
    }
}

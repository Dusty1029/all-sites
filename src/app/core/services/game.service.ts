import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { CreateGameModel, GameModel } from '../models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GameService extends BaseService<GameModel, CreateGameModel> {
    private readonly baseUrl = '/games';

    getGames(): Observable<GameModel[]> {
        return this.getAll(this.baseUrl);
    }

    createGame(createGame: CreateGameModel): Observable<string> {
        return this.create(this.baseUrl, createGame);
    }
}

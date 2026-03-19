import { Injectable } from '@angular/core';
import { BaseService } from '@shared/services';
import { Observable } from 'rxjs';
import { CreateGameModel, GameModel } from '../models';

@Injectable({
    providedIn: 'root',
})
export class GameService extends BaseService<GameModel, CreateGameModel> {
    private readonly baseUrl = '/party/games';

    getGames(): Observable<GameModel[]> {
        return this.getAll(this.baseUrl);
    }

    createGame(createGame: CreateGameModel): Observable<string> {
        return this.create(this.baseUrl, createGame);
    }
}

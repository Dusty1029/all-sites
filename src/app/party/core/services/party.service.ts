import { Injectable } from '@angular/core';
import { BaseService } from '@shared/services';
import { Observable } from 'rxjs';
import { CreatePartyModel, PartyModel, SimplePartyModel } from '../models';

@Injectable({
    providedIn: 'root',
})
export class PartyService extends BaseService<PartyModel, CreatePartyModel> {
    private readonly baseUrl = '/party';

    getParties(): Observable<SimplePartyModel[]> {
        return this.getAll(this.baseUrl);
    }

    getPartyById(id: string): Observable<PartyModel> {
        return this.getById(`${this.baseUrl}/${id}`);
    }

    createParty(createParty: CreatePartyModel): Observable<string> {
        return this.create(this.baseUrl, createParty);
    }

    getNextRound(partyId: string, winningTeamId: string): Observable<PartyModel> {
        return this.update(`${this.baseUrl}/${partyId}/winningTeam/${winningTeamId}`);
    }

    cancelPreviousRound(partyId: string): Observable<PartyModel> {
        return this.update(`${this.baseUrl}/${partyId}/cancel`);
    }
}

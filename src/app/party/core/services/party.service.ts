import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePartyModel, PartyModel, SimplePartyModel } from '../models';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root',
})
export class PartyService extends BaseService<PartyModel, CreatePartyModel> {
    private readonly baseUrl = '';

    getParties(): Observable<SimplePartyModel[]> {
        return this.getAll(this.baseUrl);
    }

    getPartyById(id: string): Observable<PartyModel> {
        return this.getById(`/${id}`);
    }

    createParty(createParty: CreatePartyModel): Observable<string> {
        return this.create(this.baseUrl, createParty);
    }

    getNextRound(partyId: string, winningTeamId: string): Observable<PartyModel> {
        return this.update(`/${partyId}/winningTeam/${winningTeamId}`);
    }

    cancelPreviousRound(partyId: string): Observable<PartyModel> {
        return this.update(`/${partyId}/cancel`);
    }
}

import { RoundModel } from './round.model';
import { TeamModel } from './team.model';

export class PartyModel {
    public id!: string;
    public name!: string;
    public isFinish!: boolean;
    public actualRound!: number;
    public round!: RoundModel;
    public teams!: TeamModel[];
}

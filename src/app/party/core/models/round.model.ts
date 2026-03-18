import { TeamModel } from './team.model';

export class RoundModel {
    public isTeamRound!: boolean;
    public gameName!: string;
    public gageName!: string;
    public teamOne?: TeamModel;
    public teamTwo?: TeamModel;
}

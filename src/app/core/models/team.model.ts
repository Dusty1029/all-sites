import { PlayerModel } from './player.model';

export class TeamModel {
    public id!: string;
    public name!: string;
    public points!: number;
    public players!: PlayerModel[];
}

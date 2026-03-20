import { PlayerInterface } from '@shared/interfaces';
import { SpecialInterface } from './special.interface';

export interface RallyeInterface {
    id: string;
    name: string;
    players: PlayerInterface[];
    specials: SpecialInterface[];
}

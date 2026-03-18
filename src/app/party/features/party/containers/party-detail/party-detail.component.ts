import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TeamPartyItemInterface } from '@coreParty/interfaces';
import { PartyModel } from '@coreParty/models';
import { PartyService } from '@coreParty/services';
import { first, switchMap } from 'rxjs';

@Component({
    selector: 'app-party-detail',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatDividerModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatCardModule,
    ],
    templateUrl: './party-detail.component.html',
    styleUrl: './party-detail.component.scss',
})
export class PartyDetailComponent implements OnInit {
    readonly party: WritableSignal<PartyModel | null> = signal(null);
    readonly teams: WritableSignal<TeamPartyItemInterface[]> = signal([]);
    readonly selectedWinner = signal<string | null>(null);

    readonly displayedColumns = ['name', 'points'];

    readonly partyService = inject(PartyService);
    readonly route = inject(ActivatedRoute);

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                first(),
                switchMap((p) => this.partyService.getPartyById(p.get('id')!))
            )
            .subscribe((p) => this.initialValue(p));
    }

    initialValue(p: PartyModel, isFirstTime: boolean = true): void {
        this.party.set(p);
        const teams = p.teams.map(
            (t) =>
                ({
                    id: t.id,
                    name: t.name,
                    points: t.points,
                    playerNames: t.players.map((p) => p.name),
                } as TeamPartyItemInterface)
        );
        if (isFirstTime) {
            const maxPlayers = teams.reduce((max, team) => {
                return Math.max(max, team.playerNames.length);
            }, 0);
            
            for (let i = 0; i < maxPlayers; i++) {
                this.displayedColumns.push('player' + i);
            }
        }

        this.teams.set(teams);
    }

    get maxNumberPlayers(): number {
        return this.teams().reduce((max, team) => {
            return Math.max(max, team.playerNames.length);
        }, 0);
    }

    selectWinner(team?: string) {
        this.selectedWinner.set(team ?? '');
    }

    nextRound() {
        this.partyService
            .getNextRound(this.party()!.id, this.selectedWinner()!)
            .pipe(first())
            .subscribe((p) => {
                this.selectedWinner.set(null);
                this.initialValue(p, false);
            });
    }

    cancelRound() {
        this.partyService
            .cancelPreviousRound(this.party()!.id)
            .pipe(first())
            .subscribe((p) => {
                this.selectedWinner.set(null);
                this.initialValue(p, false);
            });
    }
}

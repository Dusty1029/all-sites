import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { GageModel, GameModel, PlayerModel, SimplePartyModel } from '@coreParty/models';
import { GageService, GameService, PartyService, PlayerService } from '@coreParty/services';
import { filter, first, forkJoin, switchMap } from 'rxjs';
import { AddPartyDialogComponent } from '../../components';

@Component({
    selector: 'app-party-list',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatDividerModule, MatButtonModule, MatIconModule],
    templateUrl: './party-list.component.html',
    styleUrl: './party-list.component.scss',
})
export class PartyListComponent implements OnInit {
    readonly parties: WritableSignal<SimplePartyModel[]> = signal([]);
    readonly players: WritableSignal<PlayerModel[]> = signal([]);
    readonly games: WritableSignal<GameModel[]> = signal([]);
    readonly gages: WritableSignal<GageModel[]> = signal([]);

    readonly displayedColumns = ['name', 'isFinish', 'actions'];

    readonly partyService = inject(PartyService);
    readonly playerService = inject(PlayerService);
    readonly gameService = inject(GameService);
    readonly gageService = inject(GageService);
    readonly router = inject(Router);
    readonly dialog = inject(MatDialog);

    ngOnInit(): void {
        forkJoin([
            this.partyService.getParties(),
            this.playerService.getPlayers(),
            this.gameService.getGames(),
            this.gageService.getGages(),
        ]).subscribe(([parties, players, games, gages]) => {
            this.parties.set(parties);
            this.players.set(players);
            this.games.set(games);
            this.gages.set(gages);
        });
    }

    onAddParty(): void {
        const dialogRef = this.dialog.open(AddPartyDialogComponent, {
            width: '400px',
            disableClose: false,
            data: {
                players: this.players(),
                games: this.games(),
                gages: this.gages(),
            },
        });

        dialogRef
            .afterClosed()
            .pipe(
                first(),
                filter((result) => result),
                switchMap((result) => this.partyService.createParty(result))
            )
            .subscribe((id) => this.continueParty(id));
    }

    continueParty(partyId: string) {
        this.router.navigate(['/party', partyId]);
    }
}

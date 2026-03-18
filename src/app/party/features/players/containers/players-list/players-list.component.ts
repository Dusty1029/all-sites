import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { PlayerModel } from '@coreParty/models';
import { PlayerService } from '@coreParty/services';
import { filter, first, Observable, switchMap, tap } from 'rxjs';
import { AddPlayerDialogComponent } from '../../components';

@Component({
    selector: 'app-players-list',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatDividerModule, MatButtonModule, MatIconModule],
    templateUrl: './players-list.component.html',
    styleUrl: './players-list.component.scss',
})
export class PlayersListComponent implements OnInit {
    readonly playerService = inject(PlayerService);
    readonly dialog = inject(MatDialog);
    readonly players: WritableSignal<PlayerModel[]> = signal([]);

    readonly displayedColumns = ['name'];

    ngOnInit(): void {
        this.loadPlayers().subscribe();
    }

    loadPlayers(): Observable<PlayerModel[]> {
        return this.playerService.getPlayers().pipe(tap((players) => this.players.set(players)));
    }

    onAddPlayer(): void {
        const dialogRef = this.dialog.open(AddPlayerDialogComponent, {
            width: '400px',
            disableClose: false,
        });

        dialogRef
            .afterClosed()
            .pipe(
                first(),
                filter((result) => result),
                switchMap((result) => this.playerService.createPlayers({ name: result })),
                switchMap(() => this.loadPlayers())
            )
            .subscribe();
    }
}

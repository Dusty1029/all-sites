import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { GameModel } from '@core/models';
import { GameService } from '@core/services';
import { filter, first, Observable, switchMap, tap } from 'rxjs';
import { AddGameDialogComponent } from '../../components';

@Component({
    selector: 'app-games-list',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatDividerModule, MatButtonModule, MatIconModule],
    templateUrl: './games-list.component.html',
    styleUrl: './games-list.component.scss',
})
export class GamesListComponent implements OnInit {
    readonly gameService = inject(GameService);
    readonly dialog = inject(MatDialog);
    readonly games: WritableSignal<GameModel[]> = signal([]);

    readonly displayedColumns = ['name', 'isTeamGame'];

    ngOnInit(): void {
        this.loadGames().subscribe();
    }

    loadGames(): Observable<GameModel[]> {
        return this.gameService.getGames().pipe(tap((games) => this.games.set(games)));
    }

    onAddGame(): void {
        const dialogRef = this.dialog.open(AddGameDialogComponent, {
            width: '400px',
            disableClose: false,
        });

        dialogRef
            .afterClosed()
            .pipe(
                first(),
                filter((result) => result),
                switchMap((result) => this.gameService.createGame(result)),
                switchMap(() => this.loadGames())
            )
            .subscribe();
    }
}

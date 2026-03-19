import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PlayerService } from '@CoreRallye/services';
import { GenericPlayersListComponent } from '@shared/components';
import { PlayerInterface } from '@shared/interfaces';
import { first, Observable, switchMap, tap } from 'rxjs';

@Component({
    selector: 'app-players-list',
    standalone: true,
    imports: [GenericPlayersListComponent],
    templateUrl: './players-list.component.html',
    styleUrl: './players-list.component.scss',
})
export class PlayersListComponent implements OnInit {
    readonly players: WritableSignal<PlayerInterface[]> = signal([]);

    readonly playerService = inject(PlayerService);
    ngOnInit(): void {
        this.loadPlayers().subscribe();
    }

    loadPlayers(): Observable<PlayerInterface[]> {
        return this.playerService.getPlayers().pipe(
            first(),
            tap((players) => this.players.set(players)),
        );
    }

    addPlayer(name: string): void {
        this.playerService
            .createPlayers({ name })
            .pipe(
                first(),
                switchMap(() => this.loadPlayers().pipe(first())),
            )
            .subscribe();
    }
}

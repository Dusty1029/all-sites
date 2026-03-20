import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { RallyeInterface } from '@CoreRallye/interfaces';
import { PlayerService, RallyeService } from '@CoreRallye/services';
import { PlayerInterface } from '@shared/interfaces';
import { filter, first, forkJoin, switchMap } from 'rxjs';
import { AddRallyeDialogComponent, AddRallyeDialogData } from '../../components';

@Component({
    selector: 'app-rallyes-list',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatDividerModule, MatButtonModule, MatIconModule],
    templateUrl: './rallyes-list.component.html',
    styleUrl: './rallyes-list.component.scss',
})
export class RallyesListComponent implements OnInit {
    readonly displayedColumns = ['name', 'actions'];

    readonly rallyes = signal<RallyeInterface[]>([]);
    readonly players = signal<PlayerInterface[]>([]);

    readonly rallyeService = inject(RallyeService);
    readonly playerService = inject(PlayerService);

    readonly router = inject(Router);
    readonly dialog = inject(MatDialog);

    ngOnInit(): void {
        forkJoin([this.rallyeService.getRallyes(), this.playerService.getPlayers()])
            .pipe(first())
            .subscribe(([rallyes, players]) => {
                this.rallyes.set(rallyes);
                this.players.set(players);
            });
    }

    continueRallye(rallyeId: string): void {
        this.router.navigate(['/rallye', rallyeId]);
    }

    onAddRallye(): void {
        const dialogRef = this.dialog.open(AddRallyeDialogComponent, {
            width: '400px',
            disableClose: false,
            data: {
                players: this.players(),
            } as AddRallyeDialogData,
        });

        dialogRef
            .afterClosed()
            .pipe(
                first(),
                filter((result) => result),
                switchMap((result) => this.rallyeService.createRallye(result)),
            )
            .subscribe((id) => this.continueRallye(id));
    }
}

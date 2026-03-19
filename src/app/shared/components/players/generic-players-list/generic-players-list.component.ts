import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AddPlayerDialogComponent } from '@shared/components';
import { PlayerInterface } from '@shared/interfaces';
import { filter, first } from 'rxjs';
@Component({
    selector: 'app-genenric-players-list',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatDividerModule, MatButtonModule, MatIconModule],
    templateUrl: './generic-players-list.component.html',
    styleUrl: './generic-players-list.component.scss',
})
export class GenericPlayersListComponent {
    readonly players = input.required<PlayerInterface[]>();
    readonly createPlayer = output<string>();

    readonly displayedColumns = ['name'];

    readonly dialog = inject(MatDialog);

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
            )
            .subscribe((result) => this.createPlayer.emit(result));
    }
}

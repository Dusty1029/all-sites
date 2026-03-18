import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { GageModel } from '@core/models';
import { GageService } from '@core/services';
import { filter, first, Observable, switchMap, tap } from 'rxjs';
import { AddGageDialogComponent } from '../../components';

@Component({
    selector: 'app-gages-list',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatDividerModule, MatButtonModule, MatIconModule],
    templateUrl: './gages-list.component.html',
    styleUrl: './gages-list.component.scss',
})
export class GagesListComponent implements OnInit {
    readonly gageservice = inject(GageService);
    readonly dialog = inject(MatDialog);
    readonly gages: WritableSignal<GageModel[]> = signal([]);

    readonly displayedColumns = ['name'];

    ngOnInit(): void {
        this.loadGages().subscribe();
    }

    loadGages(): Observable<GageModel[]> {
        return this.gageservice.getGages().pipe(tap((gages) => this.gages.set(gages)));
    }

    onAddGage(): void {
        const dialogRef = this.dialog.open(AddGageDialogComponent, {
            width: '400px',
            disableClose: false,
        });

        dialogRef
            .afterClosed()
            .pipe(
                first(),
                filter((result) => result),
                switchMap((result) => this.gageservice.createGage({ name: result })),
                switchMap(() => this.loadGages())
            )
            .subscribe();
    }
}

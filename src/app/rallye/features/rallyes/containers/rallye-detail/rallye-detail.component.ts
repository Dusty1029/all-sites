import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { RallyeInterface, SpecialInterface } from '@CoreRallye/interfaces';
import { RallyeService, SpecialService } from '@CoreRallye/services';
import { PlayerInterface } from '@shared/interfaces';
import { first, switchMap } from 'rxjs';

@Component({
    selector: 'app-rallye-detail',
    imports: [
        CommonModule,
        MatTableModule,
        MatDividerModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatCardModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
    ],
    templateUrl: './rallye-detail.component.html',
    styleUrl: './rallye-detail.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RallyeDetailComponent implements OnInit {
    readonly displayedColumns = ['name'];

    readonly players = signal<PlayerInterface[]>([]);
    readonly rallyeName = signal<string>('');
    readonly specials = signal<SpecialInterface[]>([]);
    readonly rallyeId = signal<string>('');

    readonly route = inject(ActivatedRoute);
    readonly rallyeService = inject(RallyeService);
    readonly formBuilder = inject(FormBuilder);
    readonly specialService = inject(SpecialService);

    specialForm = this.formBuilder.group({
        name: ['', [Validators.required]],
    });

    specialTimeForm = this.formBuilder.group({
        player: ['', [Validators.required]],
        time: ['', [Validators.required]],
    });

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                first(),
                switchMap((p) => this.rallyeService.getRallyeById(p.get('id')!)),
            )
            .subscribe((r) => this.initialValue(r));
    }

    initialValue(rallye: RallyeInterface) {
        this.rallyeId.set(rallye.id);
        this.players.set(rallye.players);
        this.rallyeName.set(rallye.name);
        this.specials.set(rallye.specials);
        rallye.players.forEach((p) => this.displayedColumns.push(p.name));
    }

    createSpecial(): void {
        this.specialService
            .createSpecial(this.rallyeId(), {
                rallyeId: this.rallyeId(),
                name: this.specialForm.value.name!,
            })
            .subscribe();
    }

}

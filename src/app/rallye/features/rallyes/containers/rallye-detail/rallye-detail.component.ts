import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    OnInit,
    signal,
} from '@angular/core';
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
import { RallyeService, SpecialService, SpecialTimeService } from '@CoreRallye/services';
import { PlayerInterface } from '@shared/interfaces';
import { TimeSpanPipe } from '@shared/pipes';
import { timeWithMsValidator } from '@shared/validators';
import { NgxMaskDirective } from 'ngx-mask';
import { first, Observable, switchMap, tap } from 'rxjs';

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
        NgxMaskDirective,
        TimeSpanPipe,
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

    readonly winner = computed(() => {
        const specials = this.specials();

        const totals = new Map<string, { player: PlayerInterface; total: number }>();

        for (const special of specials) {
            for (const st of special.specialTimes) {
                const playerId = st.player.id;

                const current = totals.get(playerId) ?? {
                    player: st.player,
                    total: 0,
                };

                current.total += this.timeToMs(st.time);

                totals.set(playerId, current);
            }
        }

        // trouver le minimum
        let fastest: { player: PlayerInterface; total: number } | null = null;

        for (const entry of totals.values()) {
            if (!fastest || entry.total < fastest.total) {
                fastest = entry;
            }
        }

        return fastest?.player?.name ?? null;
    });

    readonly lastSpecial = computed(() => {
        const specials = this.specials();
        if (specials.length === 0) return null;
        return specials[specials.length - 1];
    });

    readonly playersNotYetPlayed = computed(() => {
        const last = this.lastSpecial();
        if (!last) return this.players(); // si pas de special, tous les joueurs

        // ids des joueurs qui ont déjà joué
        const playedIds = new Set(last.specialTimes.map((st) => st.player.id));

        // filtrer ceux qui ne sont pas dans playedIds
        return this.players().filter((p) => !playedIds.has(p.id));
    });

    readonly route = inject(ActivatedRoute);
    readonly rallyeService = inject(RallyeService);
    readonly formBuilder = inject(FormBuilder);
    readonly specialService = inject(SpecialService);
    readonly specialTimeService = inject(SpecialTimeService);

    specialForm = this.formBuilder.group({
        name: ['', [Validators.required]],
    });

    specialTimeForm = this.formBuilder.group({
        player: ['', [Validators.required]],
        time: ['', [Validators.required, timeWithMsValidator]],
    });

    private isFirstTimeRefresh = true;
    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                first(),
                switchMap((p) => this.refresh(p.get('id')!)),
            )
            .subscribe();
    }

    refresh(id?: string): Observable<RallyeInterface> {
        return this.rallyeService
            .getRallyeById(id ?? this.rallyeId())
            .pipe(tap((r) => this.initialValue(r)));
    }

    initialValue(rallye: RallyeInterface): void {
        this.rallyeId.set(rallye.id);
        this.players.set(rallye.players);
        this.rallyeName.set(rallye.name);
        this.specials.set(rallye.specials);
        if (this.isFirstTimeRefresh) {
            this.isFirstTimeRefresh = false;
            rallye.players.forEach((p) => this.displayedColumns.push(p.name));
        }
    }

    createSpecial(): void {
        this.specialService
            .createSpecial(this.rallyeId(), {
                rallyeId: this.rallyeId(),
                name: this.specialForm.value.name!,
            })
            .pipe(switchMap(() => this.refresh()))
            .subscribe();
    }

    createSpecialTime(): void {
        const specialId = this.specials()[this.specials().length - 1].id;
        this.specialTimeService
            .createSpecialTime(this.rallyeId(), specialId, {
                specialId: specialId,
                playerId: this.specialTimeForm.value.player!,
                time: this.specialTimeForm.value.time!,
            })
            .pipe(switchMap(() => this.refresh()))
            .subscribe();
    }

    //A modifier
    getTime(special: SpecialInterface, playerId: string): string | undefined {
        return special.specialTimes.find((st) => st.player.id === playerId)?.time;
    }

    timeToMs(time: string): number {
        const [hms, msPart = '0'] = time.split('.');
        const [h, m, s] = hms.split(':').map(Number);

        const ms = Number(msPart.padEnd(3, '0').substring(0, 3));

        return h * 3600000 + m * 60000 + s * 1000 + ms;
    }
}

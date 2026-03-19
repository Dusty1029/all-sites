import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MenuComponent, MenuInterface } from './shared/components';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MenuComponent, RouterModule, MatCardModule],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App implements OnInit {
    readonly menuConfig = signal<MenuInterface | null>(null);

    readonly partyMenu: MenuInterface = {
        name: 'Party',
        menuItems: [
            { label: 'Accueil', icon: 'home', route: '/party' },
            { label: 'Joueurs', icon: 'person', route: '/party/players' },
            { label: 'Jeux', icon: 'sports_esports', route: '/party/games' },
            { label: 'Gages', icon: 'local_bar', route: '/party/gages' },
        ],
    };

    readonly rallyeMenu: MenuInterface = {
        name: 'Rallye',
        menuItems: [
            { label: 'Accueil', icon: 'home', route: '/rallye' },
            { label: 'Joueurs', icon: 'person', route: '/rallye/players' },
        ],
    };

    apps = [
        { name: 'Party', route: '/party', desc: 'Gérer les soirées' },
        { name: 'Rallye', route: '/rallye', desc: 'Temps rallye' },
    ];

    readonly router = inject(Router);
    readonly destroyRef = inject(DestroyRef);

    ngOnInit(): void {
        this.router.events
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                filter((event) => event instanceof NavigationEnd),
            )
            .subscribe((event: NavigationEnd) => {
                const app = event.urlAfterRedirects.split('/')[1];
                switch (app) {
                    case 'party':
                        this.menuConfig.set(this.partyMenu);
                        break;
                    case 'rallye':
                        this.menuConfig.set(this.rallyeMenu);
                        break;
                    default:
                        this.menuConfig.set(null);
                }
            });
    }
}

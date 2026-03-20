import { Routes } from '@angular/router';
import { uuidGuard } from '@shared/guards';

export const PARTY_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./features/party/containers/party-list/party-list.component').then(
                (m) => m.PartyListComponent,
            ),
    },
    {
        path: 'players',
        loadComponent: () =>
            import('./features/players/containers/players-list/players-list.component').then(
                (m) => m.PlayersListComponent,
            ),
    },
    {
        path: 'games',
        loadComponent: () =>
            import('./features/games/containers/games-list/games-list.component').then(
                (m) => m.GamesListComponent,
            ),
    },
    {
        path: 'gages',
        loadComponent: () =>
            import('./features/gages/containers/gages-list/gages-list.component').then(
                (m) => m.GagesListComponent,
            ),
    },
    {
        path: ':id',
        canActivate: [uuidGuard],
        data: {
            redirectTo: '/party',
        },
        loadComponent: () =>
            import('./features/party/containers/party-detail/party-detail.component').then(
                (m) => m.PartyDetailComponent,
            ),
    },
    { path: '**', redirectTo: 'party' },
];

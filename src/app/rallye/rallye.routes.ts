import { Routes } from '@angular/router';
import { uuidGuard } from '@shared/guards';

export const RALLYE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./features/rallyes/containers/rallyes-list/rallyes-list.component').then(
                (m) => m.RallyesListComponent,
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
        path: ':id',
        canActivate: [uuidGuard],
        data: {
            redirectTo: '/party',
        },
        loadComponent: () =>
            import('./features/rallyes/containers/rallye-detail/rallye-detail.component').then(
                (m) => m.RallyeDetailComponent,
            ),
    },
    { path: '**', redirectTo: 'rallye' },
];

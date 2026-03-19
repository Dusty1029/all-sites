import { Routes } from '@angular/router';

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
    { path: '**', redirectTo: 'rallye' },
];

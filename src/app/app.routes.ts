import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'party',
        loadChildren: () =>
            import('./party/party.routes').then(
                (m) => m.PARTY_ROUTES,
            ),
    },
    { path: '**', redirectTo: 'party' },
];



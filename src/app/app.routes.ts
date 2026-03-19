import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'party',
        loadChildren: () => import('./party/party.routes').then((m) => m.PARTY_ROUTES),
    },
    {
        path: 'rallye',
        loadChildren: () => import('./rallye/rallye.routes').then((m) => m.RALLYE_ROUTES),
    },
    { path: '**', redirectTo: '' },
];

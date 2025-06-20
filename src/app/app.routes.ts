import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'credito',
        loadChildren: () => import('./credito/credito.routes').then(m => m.CREDITO_ROUTES)
    },
    {
        path: '',
        redirectTo: 'credito',
        pathMatch: 'full'
    }
];

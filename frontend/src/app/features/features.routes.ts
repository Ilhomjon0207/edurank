import { Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard)
    },
    {
        path: 'applications',
        loadComponent: () => import('./applications/applications').then((m) => m.Applications)
    },
    {
        path: 'ranking',
        loadComponent: () => import('./ranking/ranking').then((m) => m.Ranking)
    }
];

export default routes;

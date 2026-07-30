import {Routes} from '@angular/router';
import {Documentation} from './app/pages/documentation/documentation';
import {Landing} from './app/pages/landing/landing';
import {Notfound} from './app/pages/notfound/notfound';
import {MainLayout} from "@/app/layout/main-layout/main-layout";
import {Dashboard} from "@/app/features/dashboard/dashboard";
import {authGuard} from "@/app/core/guards/auth-guard";

export const appRoutes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ],
        canActivate:[authGuard],
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/features/auth/auth.routes'),
    },
    { path: '**', redirectTo: '/notfound' }
];

import {Routes} from '@angular/router';
import {guestGuard} from "@/app/core/guards/guest-guard";


export default [
    {path: 'access', loadComponent: () => import('./access/access').then(m => m.Access)},
    {path: 'error', loadComponent: () => import('./error/error').then(e => e.Error)},
    {
        path: 'login', loadComponent: () => import('./login/login').then(l => l.Login),
        canActivate: [guestGuard]
    },
] as Routes;

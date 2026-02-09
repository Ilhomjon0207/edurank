import {Routes} from "@angular/router";

export default [
    { path: 'admin', loadChildren:()=>import('./admin/admin.routes').then(m=>m.default) },
    { path: 'rating', loadChildren:()=>import('./ratings/rating.routes').then(r=>r.default) },
    { path: 'employers', loadChildren:()=>import('./employers/employer.routes').then(e=>e.default) },
    { path: 'students', loadChildren:()=>import('./student/student.routes').then(s=>s.default) },

    { path: '**', redirectTo: '/notfound' }
] as Routes;

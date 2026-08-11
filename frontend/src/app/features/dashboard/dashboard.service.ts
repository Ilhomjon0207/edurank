import { inject, Injectable } from '@angular/core';
import { BaseCrudService } from '@/app/core/services/base-crud.service';
import { IDashboard, IRankingTop, IRecentApplication } from '@/app/core/interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DashboardService extends BaseCrudService<IDashboard, any, any> {
    constructor() {
        super('/dashboard/statistics');
    }

    getAllStatic(): Observable<IDashboard> {
        return this.http.get<IDashboard>(`${environment.apiUrl}/dashboard/statistics`);
    }

    getTopCandidates(limit = 10): Observable<IRankingTop[]> {
        return this.http.get<IRankingTop[]>(`${environment.apiUrl}/ranking/top`, {
            params: {
                limit
            }
        });
    }

    getRecentApplications(limit = 10) {
        return this.http.get<IRecentApplication[]>(`${environment.apiUrl}/applications/recent?limit=${limit}`).pipe(
            map((data: IRecentApplication[]) =>
                data.map((data, index) => ({
                    id: index,
                    student: data.userName,
                    jobName: data.jobTitle,
                    status: data.status
                }))
            )
        );
    }
}

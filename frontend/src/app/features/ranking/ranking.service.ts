import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IJob, IJobsList, IRankingTop } from '@/app/core/interfaces';

@Injectable({
    providedIn: 'root'
})
export class RankingService {
    http = inject(HttpClient);

    getJobs(): Observable<IJobsList[]> {
        return this.http.get<IJob[]>(`${environment.apiUrl}/jobs`).pipe(
            map((res) =>
                res.map((data) => ({
                    id: data.id,
                    title: data.title,
                    description: data.description
                }))
            )
        );
    }

    calculatingByJob(id:string){
        return this.http.post(`${environment.apiUrl}/ranking/calculate-all/${id}`, JSON.stringify({jobId:id}))
    }

    getCandidates(id:string):Observable<IRankingTop[]> {
        return this.http.get<IRankingTop[]>(`${environment.apiUrl}/ranking/top?jobId=${id}`);
    }
}

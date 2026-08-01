import {inject, Injectable} from '@angular/core';
import {BaseCrudService} from "@/app/core/services/base-crud.service";
import {IDashboard, IRankingTop} from "@/app/core/interfaces";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "@/environments/environment";

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends BaseCrudService<IDashboard, any, any>{

    constructor() {
        super('/dashboard/statistics');
    }


    getAllStatic():Observable<IDashboard>{
       return this.http.get<IDashboard>(`${environment.apiUrl}/dashboard/statistics`);
    }

    getTopCandidates(limit = 10): Observable<IRankingTop[]> {
        return this.http.get<IRankingTop[]>(
            `${environment.apiUrl}/ranking/top`,
            {
                params: {
                    limit,
                },
            }
        );
    }
}

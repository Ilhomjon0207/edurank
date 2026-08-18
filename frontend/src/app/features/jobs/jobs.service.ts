import { Injectable } from '@angular/core';
import { BaseCrudService } from '@/app/core/services/base-crud.service';
import { ICreateJob, IJob, IJobUpdate, ISkills } from '@/app/core/interfaces';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobsService extends BaseCrudService<IJob, ICreateJob, IJobUpdate>{

    constructor() {
        super('/jobs')
    }

    getAllJobs(){
        return this.getAll();
    }

    createJob(job: ICreateJob){
        return this.create(job);
    }
    getSkills():Observable<ISkills[]> {
        return this.http.get<ISkills[]>(`${environment.apiUrl}/skills`)
    }

    deleteJob(id:string):Observable<any> {
        return this.delete(id)
    }
}

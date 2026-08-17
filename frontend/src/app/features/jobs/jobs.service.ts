import { Injectable } from '@angular/core';
import { BaseCrudService } from '@/app/core/services/base-crud.service';
import { ICreateJob, IJob, IJobUpdate } from '@/app/core/interfaces';

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
}

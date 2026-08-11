import { Injectable } from '@angular/core';
import { BaseCrudService } from '@/app/core/services/base-crud.service';
import { IApplication, IApplicationRequest, IApplicationUpdate } from '@/app/core/interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApplicationsService extends BaseCrudService<IApplication, IApplicationRequest, IApplicationUpdate> {
    constructor() {
        super('/applications');
    }

     getApplications(): Observable<IApplication[]> {
        return this.getAll();
    }
}

import {IUser}   from './user.interface'
import {IJob}   from './job.interface'
import  {ApplicationStatus} from '../enums'
export interface IRecentApplication {
    id: number;
    userId: number;
    jobId: number;
    status: ApplicationStatus;
    appliedAt: string;
    User: IUser;
    Job: IJob;
}

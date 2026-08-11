import { ApplicationStatus } from '../enums';

export interface IRecentApplication {
    id: number;
    userId: number;
    jobId: number;
    status: ApplicationStatus;
    appliedAt: string;
    userEmail: string;
    userName: string;
    jobTitle: string;
}

export interface IRecentApplicationResponse {
    id: number;
    status: ApplicationStatus;
    student: string;
    jobName: string;
}

export interface IApplicationUpdate {}

export type IApplication = Omit<IRecentApplication, 'jobId' | 'userId'>;
export interface IApplicationRequest {}

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

export interface IApplicationStudent {
    id: number;
    name: string;
    email: string;
    profile: IApplicationProfile | null;
    skills: IApplicationStudentSkill[];
}
export interface IApplicationProfile {
    gpa: number | null;
    experienceMonths: number | null;
    bio: string | null;
}
export interface IApplicationStudentSkill {
    id: number;
    name: string;
    level: number;
}
export interface IApplicationJob {
    id: number;
    title: string;
    description: string | null;
    minGpa: number | null;
    minExperience: number | null;
    deadline: string | null;
    skills: IApplicationJobSkill[];
}
export interface IApplicationJobSkill {
    id: number;
    name: string;
    requiredLevel: number;
}
export interface IApplicationDetail {
    id: number;
    status: ApplicationStatus;
    appliedAt: string;
    student: IApplicationStudent;
    job: IApplicationJob;
}

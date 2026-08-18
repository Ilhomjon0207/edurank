import { IJobSkill } from '@/app/core/interfaces/skills.interface';

export interface IJob {
    id: string;
    title: string;
    description: string;
    minGpa: number;
    isActive:boolean;
    deadline: string ;
    skills:IJobSkill[];
    minExperience: number;
}

export type IJobsList = Pick<IJob, 'id' | 'title' | 'description'>;

export interface ICreateJob {}

export interface ICreateJobResponse {}
export interface IJobUpdate {}

export interface IJob {
    id: string;
    title: string;
    description: string;
    minGpa: number;
    isActive:boolean;
    deadline: string | null;
    minExperience: number;
}

export type IJobsList = Pick<IJob, 'id' | 'title' | 'description'>;

export interface ICreateJob {}

export interface ICreateJobResponse {}
export interface IJobUpdate {}

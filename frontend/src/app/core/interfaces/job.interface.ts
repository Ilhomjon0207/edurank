export interface IJob {
    id: string;
    title: string;
    description: string;
    minGpa: number;
    deadline: string | null;
    minExperience: number;
    createdAt: string;
    updatedAt: string;
}

export type IJobsList = Pick<IJob, 'id' | 'title' | 'description' >;


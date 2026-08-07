export interface IJob {
    id: number;
    title: string;
    description: string;
    minGpa: number;
    deadline: string | null;
    minExperience: number;
    createdAt: string;
    updatedAt: string;
}

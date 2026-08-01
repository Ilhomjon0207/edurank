export interface IRankingTop{
    rank: number,
    score: number,
    student: IStudent
}

interface IStudent{
    id: number;
    name: string;
    email: string
    gpa: number,
    experience:number
}

export interface ISkills {
    id: number;
    name: string;
    description: string;
}

export interface IJobSkill {
    skillId: string;
    requiredLevel: number;
    skill:ISkills
}

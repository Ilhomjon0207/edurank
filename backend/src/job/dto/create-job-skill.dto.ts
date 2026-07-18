import {IsInt, Min} from "class-validator";

export class CreateJobSkillDTO {
    @IsInt()
    skillId: number;


    @IsInt()
    @Min(1)
    requiredLevel: number;
}
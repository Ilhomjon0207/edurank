import {IsInt, Max, Min} from "class-validator";

export class UpdateJobSkillDto {
    @IsInt()
    @Min(0)
    @Max(100)
    requiredLevel: number;
}
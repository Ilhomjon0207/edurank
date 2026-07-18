import {
    IsArray,
    IsDateString,
    IsNumber,
    IsOptional,
    IsString, ValidateNested,
} from 'class-validator';
import {CreateJobSkillDTO} from "./create-job-skill.dto";
import {Type} from "class-transformer";

export class CreateJobDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    minGpa?: number;

    @IsOptional()
    @IsDateString()
    deadline?: Date;

    @IsOptional()
    @IsNumber()
    minExperience?: number;
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateJobSkillDTO)
    skills?: CreateJobSkillDTO[];
}
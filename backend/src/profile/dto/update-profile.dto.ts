import {CreateProfileDto} from "./create-profile.dto";
import {PartialType} from "@nestjs/mapped-types";
import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsNumber, IsOptional, IsString, Min} from "class-validator";

export  class UpdateProfileDto extends PartialType(CreateProfileDto){
    @ApiPropertyOptional({
        example: 3.75,
        description: 'Student GPA score',
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    gpa?: number;


    @ApiPropertyOptional({
        example: 18,
        description: 'Experience in months',
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    experienceMonths?: number;


    @ApiPropertyOptional({
        example: 'Frontend developer with Angular and NestJS experience',
        description: 'Student biography',
    })
    @IsOptional()
    @IsString()
    bio?: string;
}
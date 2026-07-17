import {IsOptional, IsString} from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateSkillDto {

    @ApiProperty({
        example: 'NestJS',
        description: 'Skill name',
    })
    @IsString()
    name: string;


    @ApiPropertyOptional({
        example: 'Node.js backend framework',
        description: 'Skill description',
    })
    @IsOptional()
    @IsString()
    description?: string;
}
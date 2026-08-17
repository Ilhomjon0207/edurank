import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateJobSkillDTO } from './create-job-skill.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({
    example: 'create-job',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'create-job description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 3.4,
  })
  @IsOptional()
  @IsNumber()
  minGpa?: number;

  @ApiProperty({
    example: '2025-12-23',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  deadline?: string;

  @ApiProperty({
    example: 23,
  })
  @IsOptional()
  @IsNumber()
  minExperience?: number;

  @ApiProperty({
    type: [CreateJobSkillDTO],
    example: [
      {
        skillId: '8edea2b0-5c51-4e47-bbd3-45b43b3ba4d2',
        requiredLevel: 4,
      },
      {
        skillId: 'd1ea61c3-93bd-4563-9dc7-6bff2cfd5bcd',
        requiredLevel: 3,
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateJobSkillDTO)
  skills?: CreateJobSkillDTO[];
}

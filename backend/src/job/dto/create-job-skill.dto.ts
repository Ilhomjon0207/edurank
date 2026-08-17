import { IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobSkillDTO {
  @ApiProperty({
    example: '0acfb985-27c3-4fc7-afb5-946bcefcdf8b',
  })
  @IsString()
  skillId: string;

  @ApiProperty({
    example: 1,
  })
  @Min(1)
  requiredLevel: number;
}

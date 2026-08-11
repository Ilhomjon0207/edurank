import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max, Min } from 'class-validator';

export class AddUserSkillDto {
  @ApiProperty({
    example: 1,
    description: 'Skill ID',
  })
  @IsString()
  skillId: string;

  @ApiProperty({
    example: 4,
    description: 'Skill level from 1 to 5',
  })
  @IsInt()
  @Min(1)
  @Max(5)
  level: number;
}

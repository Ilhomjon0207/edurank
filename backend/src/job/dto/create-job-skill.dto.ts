import { IsString, Min } from 'class-validator';

export class CreateJobSkillDTO {
  @IsString()
  skillId: string;

  @IsString()
  @Min(1)
  requiredLevel: number;
}

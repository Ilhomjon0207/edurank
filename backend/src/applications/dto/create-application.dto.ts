import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty({
    example: 1,
    description: 'Job ID',
  })
  @IsInt()
  @IsNotEmpty()
  jobId: number;
}

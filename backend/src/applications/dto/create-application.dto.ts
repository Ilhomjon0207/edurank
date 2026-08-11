import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty({
    example: 1,
    description: 'Job ID',
  })
  @IsString()
  @IsNotEmpty()
  jobId: string;
}

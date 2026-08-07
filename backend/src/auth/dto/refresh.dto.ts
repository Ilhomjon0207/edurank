import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Refresh token',
    default: 'asdadsadsadad......',
  })
  refreshToken: string;
}

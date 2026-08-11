import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'ilhomjon',
    description: 'Ingrese una email',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'ilhomjon@gmail.com',
    description: 'Ingrese una email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Password',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

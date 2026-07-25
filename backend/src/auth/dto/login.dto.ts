import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'john@test.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'Admin@123',
  })
  @IsNotEmpty()
  password!: string;
}

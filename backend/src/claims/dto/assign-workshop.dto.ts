import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AssignWorkshopDto {
  @ApiProperty({
    example: 'cmf8gk2mz0000abc123xyz456',
    description: 'Workshop ID',
  })
  @IsString()
  workshopId!: string;
}

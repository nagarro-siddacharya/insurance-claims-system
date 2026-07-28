import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({
    example: '2026-08-15T10:30:00.000Z',
    description: 'Appointment date and time',
  })
  @IsDateString()
  appointmentDate!: string;

  @ApiProperty({
    example: 'cmf8gk2mz0000abc123xyz456',
    description: 'Claim ID',
  })
  @IsString()
  claimId!: string;
}

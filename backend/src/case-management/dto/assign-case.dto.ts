import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AssignCaseDto {
  @ApiProperty({ example: 'case-manager-user-id' })
  @IsString()
  caseManagerId!: string;

  @ApiProperty({ example: 'surveyor-user-id', required: false })
  @IsOptional()
  @IsString()
  surveyorId?: string;
}

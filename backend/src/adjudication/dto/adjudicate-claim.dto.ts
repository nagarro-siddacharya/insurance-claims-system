import { ClaimStatus } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class AdjudicateClaimDto {
  @ApiProperty({
    enum: [ClaimStatus.APPROVED, ClaimStatus.REJECTED],
    example: ClaimStatus.APPROVED,
    description: 'Adjudication decision for the claim',
  })
  @IsEnum([ClaimStatus.APPROVED, ClaimStatus.REJECTED], {
    message: 'Decision must be APPROVED or REJECTED',
  })
  decision!: 'APPROVED' | 'REJECTED';

  @ApiPropertyOptional({
    example: 12500,
    description:
      'Approved settlement amount. Required when the claim is approved.',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  approvedAmount?: number;

  @ApiProperty({
    example:
      'Damage is covered under collision coverage. Repair estimate is within policy limits.',
    description: 'Reason supporting the adjudication decision',
  })
  @IsString()
  @MinLength(5)
  decisionReason!: string;
}

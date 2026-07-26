import { ClaimStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateClaimStatusDto {
  @ApiProperty({
    enum: ClaimStatus,
    description: 'The new status of the claim',
    example: ClaimStatus.APPROVED,
  })
  @IsEnum(ClaimStatus, { message: 'Invalid claim status' })
  status!: ClaimStatus;
}

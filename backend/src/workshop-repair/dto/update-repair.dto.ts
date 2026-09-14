import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { RepairStatus } from '@prisma/client';

export class UpdateRepairDto {
  @IsOptional()
  @IsEnum(RepairStatus)
  status?: RepairStatus;

  @IsOptional()
  @IsDateString()
  expectedDeliveryDate?: string;

  @IsOptional()
  @IsString()
  repairNotes?: string;
}

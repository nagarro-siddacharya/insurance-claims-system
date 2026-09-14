import { IsDateString, IsOptional } from 'class-validator';

export class StartRepairDto {
  @IsOptional()
  @IsDateString()
  expectedDeliveryDate?: string;
}

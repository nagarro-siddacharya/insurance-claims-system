import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CompleteRepairDto {
  @IsNumber()
  @Min(0)
  finalBillAmount!: number;

  @IsOptional()
  @IsString()
  repairNotes?: string;
}

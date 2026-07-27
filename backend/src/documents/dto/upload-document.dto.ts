import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UploadDocumentDto {
  @ApiProperty({
    description: 'The ID of the claim to which the document belongs',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  claimId!: string;
}

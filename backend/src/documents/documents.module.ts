import { Module } from '@nestjs/common';
import { DocumentsController } from './controllers/documents.controller';
import { DocumentsService } from './services/documents.service';
import { DocumentsRepository } from './repositories/documents.repository';
import { ClaimsRepository } from 'src/claims/repositories/claims.repository';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService, DocumentsRepository, ClaimsRepository],
})
export class DocumentsModule {}

import { Module } from '@nestjs/common';
import { ClaimsController } from './controllers/claims.controller';
import { ClaimsService } from './services/claims.service';
import { ClaimsRepository } from './repositories/claims.repository';
import { WorkshopsRepository } from 'src/workshops/repositories/workshops.repository';

@Module({
  controllers: [ClaimsController],
  providers: [ClaimsService, ClaimsRepository, WorkshopsRepository],
})
export class ClaimsModule {}

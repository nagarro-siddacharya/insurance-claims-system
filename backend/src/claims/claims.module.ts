import { Module } from '@nestjs/common';
import { ClaimsController } from './controllers/claims.controller';
import { ClaimsService } from './services/claims.service';
import { ClaimsRepository } from './repositories/claims.repository';

@Module({
  controllers: [ClaimsController],
  providers: [ClaimsService, ClaimsRepository]
})
export class ClaimsModule {}

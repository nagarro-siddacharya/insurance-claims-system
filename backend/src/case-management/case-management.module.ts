import { Module } from '@nestjs/common';
import { ClaimsModule } from 'src/claims/claims.module';
import { UsersModule } from 'src/users/users.module';
import { CaseManagementController } from './controllers/case-management.controller';
import { CaseManagementRepository } from './repositories/case-management.repository';
import { CaseManagementService } from './services/case-management.service';

@Module({
  imports: [ClaimsModule, UsersModule],
  controllers: [CaseManagementController],
  providers: [CaseManagementService, CaseManagementRepository],
})
export class CaseManagementModule {}

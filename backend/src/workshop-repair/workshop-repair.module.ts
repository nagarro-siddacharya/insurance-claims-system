import { Module } from '@nestjs/common';
import { WorkshopRepairController } from './controllers/workshop-repair.controller';
import { WorkshopRepairService } from './services/workshop-repair.service';
import { WorkshopRepairRepository } from './repositories/workshop-repair.repository';
import { ClaimsModule } from 'src/claims/claims.module';
import { WorkshopsModule } from 'src/workshops/workshops.module';

@Module({
  imports: [ClaimsModule, WorkshopsModule],
  controllers: [WorkshopRepairController],
  providers: [WorkshopRepairService, WorkshopRepairRepository],
})
export class WorkshopRepairModule {}

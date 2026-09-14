import { Module } from '@nestjs/common';
import { WorkshopsController } from './controllers/workshops.controller';
import { WorkshopsService } from './services/workshops.service';
import { WorkshopsRepository } from './repositories/workshops.repository';

@Module({
  controllers: [WorkshopsController],
  providers: [WorkshopsService, WorkshopsRepository],
  exports: [WorkshopsRepository],
})
export class WorkshopsModule {}

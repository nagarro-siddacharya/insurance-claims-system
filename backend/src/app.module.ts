import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { ClaimsModule } from './claims/claims.module';
import { DocumentsModule } from './documents/documents.module';
import { WorkshopsModule } from './workshops/workshops.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { SurveysModule } from './surveys/surveys.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    RolesModule,
    AuthModule,
    ClaimsModule,
    DocumentsModule,
    WorkshopsModule,
    AppointmentsModule,
    SurveysModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

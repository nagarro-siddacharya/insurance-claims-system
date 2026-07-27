import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { ClaimsModule } from './claims/claims.module';
import { DocumentsModule } from './documents/documents.module';
import { WorkshopsModule } from './workshops/workshops.module';

@Module({
  imports: [PrismaModule, UsersModule, RolesModule, AuthModule, ClaimsModule, DocumentsModule, WorkshopsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

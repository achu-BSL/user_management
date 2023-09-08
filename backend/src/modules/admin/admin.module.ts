import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaModule } from '../prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AdminAuthGuard } from '../auth/admin-auth.guard';

@Module({
  imports: [PrismaModule],
  controllers: [AdminController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AdminAuthGuard,
    },
    AdminService,
  ],
})
export class AdminModule {}

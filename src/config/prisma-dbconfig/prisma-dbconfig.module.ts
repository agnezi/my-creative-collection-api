import { Module } from '@nestjs/common';
import { PrismaDbconfigService } from './prisma-dbconfig.service';

@Module({
  providers: [PrismaDbconfigService],
  exports: [PrismaDbconfigService],
})
export class PrismaDbconfigModule {}

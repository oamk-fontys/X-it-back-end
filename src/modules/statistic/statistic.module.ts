import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';

@Module({
  controllers: [StatisticController],
  providers: [StatisticService, PrismaService],
})
export class StatisticModule {}

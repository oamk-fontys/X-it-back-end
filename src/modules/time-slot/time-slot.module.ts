import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { TimeSlotController } from './time-slot.controller';
import { TimeSlotService } from './time-slot.service';

@Module({
  imports: [],
  controllers: [TimeSlotController],
  providers: [TimeSlotService, PrismaService],
  exports: [TimeSlotService],
})
export class TimeSlotModule { }

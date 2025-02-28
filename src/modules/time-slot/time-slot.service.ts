import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class TimeSlotService {
  constructor(private readonly prisma: PrismaService) {}

  async getTimeSlots(roomId: string) {
    return await this.prisma.timeSlot.findMany({
      where: {
        roomId,
      },
      include: {
        room: true,
      },
    });
  }
}

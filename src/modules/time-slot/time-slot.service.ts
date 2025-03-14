import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/core/database/prisma.service';
import { UserDto } from '../user/dto/user.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

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

  async updateStatus(timeSlotId: string, body: UpdateStatusDto, user: UserDto) {
    const timeSlot = await this.prisma.timeSlot.findUnique({
      where: { id: timeSlotId },
      include: {
        room: {},
      },
    });

    if (!timeSlot) {
      throw new NotFoundException('Time slot not found');
    }

    if (user.role === Role.COMPANY) {
      if (timeSlot.room.companyId !== user.company.id) {
        throw new ForbiddenException(
          'You are not allowed to update this time slot',
        );
      }
    }

    return this.prisma.timeSlot.update({
      where: { id: timeSlotId },
      data: { status: body.status },
      include: {
        room: true,
      },
    });
  }
}

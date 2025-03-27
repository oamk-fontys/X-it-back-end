import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role, WeekDay } from '@prisma/client';
import { PrismaService } from 'src/core/database/prisma.service';
import { UserDto } from '../user/dto/user.dto';
import { CreateEditTimeSlotDto } from './dto/create-edit-time-slot.dto';


@Injectable()
export class TimeSlotService {
  constructor(private readonly prisma: PrismaService) { }

  async getTimeSlots(roomId: string) {
    return await this.prisma.timeSlot.findMany({
      where: {
        roomId,
      },
      include: {
        room: true,
        booking: true,
      },
    });
  }

  async createTimeSlot(body: CreateEditTimeSlotDto, user: UserDto) {
    const room = await this.prisma.room.findUnique({
      where: { id: body.roomId },
      include: {
        company: true,
      },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (user.role === Role.COMPANY) {
      if (room.companyId !== user.company.id) {
        throw new ForbiddenException(
          'You are not allowed to create time slots for this room',
        );
      }
    }

    const endTime = this.calculateEndTime(body.start, room.duration);

    await this.checkOverlappingTimeSlots(
      body.roomId,
      body.day,
      body.start,
      endTime,
    );

    return this.prisma.timeSlot.create({
      data: {
        ...body,
        roomId: body.roomId,
        end: endTime,
      },
    });
  }

  async updateTimeSlot(
    timeSlotId: string,
    body: CreateEditTimeSlotDto,
    user: UserDto,
  ) {
    const timeSlot = await this.prisma.timeSlot.findUnique({
      where: { id: timeSlotId },
      include: {
        room: {
          include: {
            company: true,
          },
        },
      },
    });

    if (!timeSlot) {
      throw new NotFoundException('Time slot not found');
    }

    await this.hasAccessToTimeSlot(timeSlotId, user);

    const endTime = this.calculateEndTime(body.start, timeSlot.room.duration);

    await this.checkOverlappingTimeSlots(
      timeSlot.roomId,
      body.day,
      body.start,
      endTime,
      timeSlot.id,
    );

    return this.prisma.timeSlot.update({
      where: { id: timeSlotId },
      data: {
        ...body,
        end: endTime,
      },
    });
  }

  async deleteTimeSlot(timeSlotId: string, user: UserDto) {
    const timeSlot = await this.prisma.timeSlot.findUnique({
      where: { id: timeSlotId },
      include: {
        room: {
          include: {
            company: true,
          },
        },
      },
    });

    if (!timeSlot) {
      throw new NotFoundException('Time slot not found');
    }

    await this.hasAccessToTimeSlot(timeSlotId, user);

    return this.prisma.timeSlot.delete({
      where: { id: timeSlotId },
    });
  }

  private async checkOverlappingTimeSlots(
    roomId: string,
    day: WeekDay,
    start: string,
    end: string,
    excludeTimeSlotId?: string,
  ) {
    // First get the room to access cleanUpTime
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    const existingTimeSlots = await this.prisma.timeSlot.findMany({
      where: {
        roomId,
        day,
        ...(excludeTimeSlotId && { id: { not: excludeTimeSlotId } }),
      },
    });

    const newStart = this.convertTimeToMinutes(start);
    const newEnd = this.convertTimeToMinutes(end) + room.cleanUpTime;

    const isOverlapping = existingTimeSlots.some((slot) => {
      const existingStart = this.convertTimeToMinutes(slot.start);
      const existingEnd =
        this.convertTimeToMinutes(slot.end) + room.cleanUpTime;

      return (
        (newStart >= existingStart && newStart < existingEnd) ||
        (newEnd > existingStart && newEnd <= existingEnd) ||
        (newStart <= existingStart && newEnd >= existingEnd)
      );
    });

    if (isOverlapping) {
      throw new BadRequestException(
        'Time slot overlaps with existing slots (including cleanup time)',
      );
    }
  }

  private convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private calculateEndTime(
    startTime: string,
    durationInMinutes: number,
  ): string {
    const [hours, minutes] = startTime.split(':').map(Number);
    let totalMinutes = hours * 60 + minutes + durationInMinutes;

    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;

    return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
  }

  private async hasAccessToTimeSlot(timeSlotId: string, user: UserDto) {
    const timeSlot = await this.prisma.timeSlot.findUnique({
      where: { id: timeSlotId },
      include: {
        room: {
          include: {
            company: true,
          },
        },
      },
    });

    if (!timeSlot) {
      throw new NotFoundException('Time slot not found');
    }

    if (user.role === Role.COMPANY) {
      if (timeSlot.room.company?.id !== user.company.id) {
        throw new ForbiddenException(
          'You are not allowed to update this time slot',
        );
      }
    }
  }

  public async isTimeSlotBooked(
    timeSlotId: string,
    date: Date,
    userId: string
  ): Promise<boolean> {
    console.log('Start checking time slot:', { timeSlotId, date, userId });

    if (!userId) {
      console.error('No userId provided!');
      throw new Error('User ID is required to book a time slot.');
    }

    // Controleer of de opgegeven userId bestaat in de database
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      console.error(`User ID '${userId}' does not exist.`);
      throw new Error('Invalid User ID: The user does not exist.');
    }

    console.log('Valid user found:', userId);

    return await this.prisma.$transaction(async (prisma) => {
      console.log('Starting transaction...');

      // Controleer of het tijdslot al geboekt is
      const existingBooking = await prisma.booking.findFirst({
        where: {
          timeSlotId,
          date: date.toISOString(),
        },
      });

      console.log('Existing booking check:', existingBooking);

      if (existingBooking) {
        console.log(`Time slot '${timeSlotId}' on '${date}' is already booked.`);
        return false;
      }

      // Boek het tijdslot
      const newBooking = await prisma.booking.create({
        data: {
          timeSlotId,
          date: date.toISOString(),
          userId: userId,
          roomId: 'someRoomId', // Kan dynamisch worden gemaakt
        },
      });

      console.log('New booking created successfully:', newBooking);
      return true;
    });
  }
}

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookingState } from '@prisma/client';
import { PrismaService } from 'src/core/database/prisma.service';
import { RoomService } from '../room/room.service';
import { TimeSlotService } from '../time-slot/time-slot.service';
import { UserService } from '../user/user.service';
import { CreateEditBookingDto } from './dto/create-edit-booking.dto';
import { MinimalUserDto } from '../user/dto/minimal-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly roomService: RoomService,
    private readonly timeSlotService: TimeSlotService,
  ) { }

  public async getAllBookingsByUserId(userId: string) {
    const bookings = await this.prisma.booking.findMany({
      where: {
        userId: userId,
      },
      include: {
        room: true,
        user: true,
      },
    });

    return bookings.map((booking) => {
      const minimalUser = plainToInstance(MinimalUserDto, booking.user, {
        excludeExtraneousValues: true,
      });
      return {
        ...booking,
        user: minimalUser,
      };
    });
  }

  public async getSingleBookingByUserId(userId: string, id: string) {
    const booking = await this.prisma.booking.findFirst({
      where: {
        id: id,
        userId: userId,
      },
      include: {
        room: true,
        user: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const minimalUser = plainToInstance(MinimalUserDto, booking.user, {
      excludeExtraneousValues: true,
    });

    return {
      ...booking,
      user: minimalUser,
    };
  }


  public async createBooking(body: CreateEditBookingDto, userId: string) {

    const roomExists = await this.roomService.doesRoomExist(body.roomId);
    if (!roomExists) {
      throw new NotFoundException('Room not found');
    }

    const timeslotExists = await this.timeSlotService.getTimeSlots(body.timeslotId);
    if (!timeslotExists) {
      throw new NotFoundException('Timeslot not found');
    }

    const timeslotIsAvailable = await this.timeSlotService.isTimeSlotBooked(
      body.timeslotId,
      new Date(body.date),
    );
    if (!timeslotIsAvailable) {
      throw new ForbiddenException('Timeslot is already booked');
    }

    if (body.companyId) {
      const companyExists = await this.prisma.company.findUnique({
        where: { id: body.companyId },
      });

      if (!companyExists) {
        throw new NotFoundException('Company not found');
      }
    }

    const newBooking = await this.prisma.booking.create({
      data: {
        userId: userId,
        roomId: body.roomId,
        state: BookingState.SCHEDULED,
        timeSlotId: body.timeslotId,
        date: body.date,
        companyId: body.companyId,
      },
    });

    return newBooking;
  }


  public async updateBooking(
    id: string,
    body: CreateEditBookingDto,
    userId: string,
  ) {
    const bookingToUpdate = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!bookingToUpdate) {
      throw new NotFoundException('Booking not found');
    }

    if (bookingToUpdate.userId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to update this booking',
      );
    }

    return await this.prisma.booking.update({
      where: { id },
      data: {
        userId: userId,
        roomId: body.roomId,
      },
    });
  }

  public async cancelBooking(id: string) {
    const bookingToCancel = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!bookingToCancel) {
      throw new NotFoundException('Booking not found');
    }

    return await this.prisma.booking.update({
      where: { id },
      data: {
        state: BookingState.CANCELLED,
      },
    });
  }

  public async getAllBookingsByCompanyId(companyId: string) {
    const bookings = await this.prisma.booking.findMany({
      where: {
        companyId: companyId,
      },
      include: {
        room: true,
        user: true,
      },
    });

    return bookings.map((booking) => {
      const minimalUser = plainToInstance(MinimalUserDto, booking.user, {
        excludeExtraneousValues: true,
      });
      return {
        ...booking,
        user: minimalUser,
      };
    });
  }
}

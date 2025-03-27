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
import { ad } from '@faker-js/faker/dist/airline-BXaRegOM';

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
    const roomExists = await this.prisma.room.findUnique({
      where: { id: body.roomId },
    });
    if (!roomExists) {
      throw new NotFoundException(`Room not found for ID: ${body.roomId}`);
    }

    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      throw new NotFoundException(`User not found for ID: ${userId}`);
    }

    const roundedDate = this.timeSlotService.roundDateToMinutes(new Date(body.date)); // Datum afronden

    const existingBooking = await this.prisma.booking.findFirst({
      where: {
        timeSlotId: body.timeslotId,
        date: roundedDate, // Controle met afgeronde tijd
      },
    });
    if (existingBooking) {
      throw new ForbiddenException(`Timeslot already booked: ${body.timeslotId}`);
    }

    const newBooking = await this.prisma.booking.create({
      data: {
        userId,
        roomId: body.roomId,
        timeSlotId: body.timeslotId,
        date: roundedDate, // Gebruik de afgeronde tijd
        companyId: body.companyId || null,
        state: BookingState.SCHEDULED,
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

  public async getAllBookingsForAdmins() {
    const adminBookings = await this.prisma.booking.findMany({
      where: {
        user: {
          role: 'ADMIN',
        },
      },
      include: {
        room: true,
        user: true,
      },
    });

    return adminBookings.map((booking) => {
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

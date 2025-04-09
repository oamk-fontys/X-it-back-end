import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BookingState, Role } from '@prisma/client';
import { PrismaService } from 'src/core/database/prisma.service';
import { RoomService } from '../room/room.service';
import { TimeSlotService } from '../time-slot/time-slot.service';
import { UserDto } from '../user/dto/user.dto';
import { CreateEditBookingDto } from './dto/create-edit-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly roomService: RoomService,
    private readonly timeSlotService: TimeSlotService,
    private readonly jwtService: JwtService,
  ) {}

  public async generateQr(userId: string, bookingId: string) {
    const booking = await this.prisma.booking.findFirst({
      where: {
        id: bookingId,
      },
      include: {
        timeSlot: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.userId !== userId) {
      throw new ForbiddenException(
        "You're not the owner of this booking, you can't generate a QR code for it",
      );
    }

    const date = new Date(booking.date);
    const today = new Date();

    const isToday = date.toDateString() === today.toDateString();

    if (!isToday) {
      throw new BadRequestException('Booking is not today');
    }

    // Check if current time is within 15 minutes of booking time slot
    const [hours, minutes] = booking.timeSlot.start.split(':');
    const bookingTime = new Date(date);
    bookingTime.setHours(parseInt(hours), parseInt(minutes));

    const timeDiff = today.getTime() - bookingTime.getTime();
    const minutesDiff = Math.floor(timeDiff / 1000 / 60);

    // Allow scanning 15 minutes before and up to 60 minutes after booking time
    if (minutesDiff < -15 || minutesDiff > 15) {
      throw new BadRequestException(
        'QR code can only be generated between 15 minutes before and 15 minutes after booking time',
      );
    }

    // Generate a booking token with limited validity
    const token = await this.jwtService.signAsync(
      {
        userId,
        bookingId,
      },
      {
        expiresIn: '15m', // Token expires in 15 minutes
      },
    );

    return {
      token,
    };
  }

  public async getAllBookings() {
    return await this.prisma.booking.findMany({
      include: {
        room: true,
        user: true,
      },
    });
  }

  public async getAllBookingsByUserId(userId: string) {
    return await this.prisma.booking.findMany({
      where: {
        userId: userId,
      },
      include: {
        room: true,
        user: true,
      },
    });
  }

  public async getAllBookingsByCompanyId(companyId: string) {
    return await this.prisma.booking.findMany({
      where: {
        companyId: companyId,
      },
      include: {
        room: true,
        user: true,
      },
    });
  }

  public async getBookingById(id: string, user: UserDto) {
    const booking = await this.prisma.booking.findFirst({
      where: {
        id,
      },
      include: {
        room: true,
        user: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    await this.hasAccessToBooking(booking, user);

    return booking;
  }

  private hasAccessToBooking(booking: any, user: UserDto) {
    if (user.role === Role.USER) {
      if (booking.user.id !== user.id) {
        throw new ForbiddenException(
          'You are not allowed to access this booking',
        );
      }
    }
  }

  public async createBooking(body: CreateEditBookingDto, userId: string) {
    {
      const roomExists = await this.roomService.doesRoomExist(body.roomId);

      if (!roomExists) {
        throw new NotFoundException('Room not found');
      }

      const date = new Date(body.date);

      const timeslot = await this.timeSlotService.getTimeSlotById(
        body.timeslotId,
        date,
      );

      if (!timeslot.isAvailable) {
        throw new BadRequestException('Timeslot is already booked');
      }

      const newBooking = await this.prisma.booking.create({
        data: {
          userId: userId,
          roomId: body.roomId,
          state: BookingState.SCHEDULED,
          timeSlotId: body.timeslotId,
          date,
        },
      });

      return newBooking;
    }
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
}

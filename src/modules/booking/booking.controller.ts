import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Role, BookingState } from '@prisma/client';
import { IsAuthenticated } from 'src/core/auth/auth.decorator';
import { RequestWithUser } from 'src/core/auth/auth.guard';
import { ResponseInterceptor } from 'src/core/interceptor/response.interceptor';
import { MinimalRoomDto } from 'src/modules/room/dto/minimal-room.dto';
import { MinimalUserDto } from 'src/modules/user/dto/minimal-user.dto';
import { MinimalTimeSlotDto } from '../time-slot/dto/time-slot.dto';
import { BookingGuard, RequestWithQRCode } from './booking.guard';
import { BookingService } from './booking.service';
import { BookingQrCodeDto } from './dto/booking-qr-code.dto';
import { BookingDto } from './dto/booking.dto';
import { CreateEditBookingDto } from './dto/create-edit-booking.dto';
import { ValidateBookingDto } from './dto/validate-booking.dto';

@Controller('booking')
@UseInterceptors(ClassSerializerInterceptor)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('admin')
  @ApiOkResponse({
    description: 'Get all bookings for admins',
    type: BookingDto,
    isArray: true,
  })
  @IsAuthenticated([Role.ADMIN])
  @UseInterceptors(
    new ResponseInterceptor(BookingDto, {
      user: MinimalUserDto,
      room: MinimalRoomDto,
      timeSlot: MinimalTimeSlotDto,
    }),
  )
  async getAllBookings(@Req() req: RequestWithUser) {
    return this.bookingService.getAllBookings();
  }

  @Get('user')
  @ApiOkResponse({
    description: 'Get all bookings for user',
    type: BookingDto,
    isArray: true,
  })
  @IsAuthenticated([Role.USER])
  @UseInterceptors(
    new ResponseInterceptor(BookingDto, {
      user: MinimalUserDto,
      room: MinimalRoomDto,
      timeSlot: MinimalTimeSlotDto,
    }),
  )
  async getAllBookingsByUserId(@Req() req: RequestWithUser) {
    return this.bookingService.getAllBookingsByUserId(req.user.id);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Get the current booking',
    type: BookingDto,
  })
  @IsAuthenticated()
  @UseInterceptors(
    new ResponseInterceptor(BookingDto, {
      user: MinimalUserDto,
      room: MinimalRoomDto,
      timeSlot: MinimalTimeSlotDto,
    }),
  )
  async getSingleBookingByUserId(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
  ) {
    return this.bookingService.getBookingById(id, req.user);
  }

  @Get('/company/:companyId')
  @ApiOkResponse({
    description: 'Get all bookings by company ID',
    type: BookingDto,
    isArray: true,
  })
  @UseInterceptors(
    new ResponseInterceptor(BookingDto, {
      user: MinimalUserDto,
      room: MinimalRoomDto,
      timeSlot: MinimalTimeSlotDto,
    }),
  )
  @IsAuthenticated([Role.ADMIN, Role.COMPANY])
  async getAllBookingsByCompanyId(@Param('companyId') companyId: string) {
    return this.bookingService.getAllBookingsByCompanyId(companyId);
  }

  @Post()
  @ApiOkResponse({
    description: 'create a booking',
    type: BookingDto,
  })
  @IsAuthenticated()
  async createBooking(
    @Req() req: RequestWithUser,
    @Body() booking: CreateEditBookingDto,
  ) {
    return this.bookingService.createBooking(booking, req.user.id);
  }

  @Post('validate')
  @ApiOkResponse({
    description: 'validate a booking',
    type: BookingQrCodeDto,
  })
  @UseGuards(BookingGuard)
  @UseInterceptors(new ResponseInterceptor(BookingQrCodeDto))
  async validateBooking(
    @Req() req: RequestWithQRCode,
    @Body() body: ValidateBookingDto,
  ) {
    return req.qr;
  }

  @Post('generate-qr/:bookingId')
  @ApiOkResponse({
    description: 'validate a booking',
    type: ValidateBookingDto,
  })
  @IsAuthenticated()
  @UseInterceptors(new ResponseInterceptor(ValidateBookingDto))
  async generateQr(
    @Req() req: RequestWithUser,
    @Param('bookingId') bookingId: string,
  ) {
    return this.bookingService.generateQr(req.user.id, bookingId);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'update a booking',
    type: BookingDto,
  })
  @IsAuthenticated()
  async updateBooking(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() booking: CreateEditBookingDto,
  ) {
    return this.bookingService.updateBooking(id, booking, req.user.id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'delete a booking',
    type: BookingDto,
  })
  @IsAuthenticated()
  async deleteBooking(@Param('id') id: string) {
    return this.bookingService.cancelBooking(id);
  }

  @Put(':id/state')
  @IsAuthenticated([Role.ADMIN, Role.COMPANY])
  async updateBookingState(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() body: { state: BookingState },
  ) {
    return this.bookingService.updateBookingState(id, body.state, req.user);
  }
}

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
import { Role } from '@prisma/client';
import { IsAuthenticated } from 'src/core/auth/auth.decorator';
import { RequestWithUser } from 'src/core/auth/auth.guard';
import { ResponseInterceptor } from 'src/core/interceptor/response.interceptor';
import { MinimalRoomDto } from 'src/modules/room/dto/minimal-room.dto';
import { MinimalUserDto } from 'src/modules/user/dto/minimal-user.dto';
import { BookingGuard, RequestWithQRCode } from './booking.guard';
import { BookingService } from './booking.service';
import { BookingQrCodeDto } from './dto/booking-qr-code.dto';
import { BookingDto } from './dto/booking.dto';
import { CreateEditBookingDto } from './dto/create-edit-booking.dto';
import { ValidateBookingDto } from './dto/validate-booking.dto';

@Controller('booking')
@UseInterceptors(ClassSerializerInterceptor)
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Get()
  @ApiOkResponse({
    description: 'Get all bookings for users and admins',
    type: BookingDto,
    isArray: true,
  })
  @IsAuthenticated([Role.ADMIN, Role.USER])
  @UseInterceptors(
    new ResponseInterceptor(BookingDto, {
      user: MinimalUserDto,
      room: MinimalRoomDto,
    }),
  )
  async getAllBookings(@Req() req: RequestWithUser) {
    if (req.user.role === Role.ADMIN) {
      return this.bookingService.getAllBookings();
    } else if (req.user.role === Role.USER) {
      return this.bookingService.getAllBookingsByUserId(req.user.id);
    }
  }

  @Get()
  @ApiOkResponse({
    description: 'Get all bookings for company',
    type: BookingDto,
    isArray: true,
  })
  @IsAuthenticated([Role.COMPANY])
  @UseInterceptors(
    new ResponseInterceptor(BookingDto, {
      user: MinimalUserDto,
      room: MinimalRoomDto,
    }),
  )
  async getAllBookingsCompanyId(@Req() req: RequestWithUser) {
    if (req.user.role === Role.COMPANY) {
      return this.bookingService.getAllBookingsCompanyId(req.user.companyId);
    }
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
}

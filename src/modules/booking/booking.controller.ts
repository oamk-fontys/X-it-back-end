import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsAuthenticated } from 'src/core/auth/auth.decorator';
import { RequestWithUser } from 'src/core/auth/auth.guard';
import { ResponseInterceptor } from 'src/core/interceptor/response.interceptor';
import { MinimalRoomDto } from 'src/modules/room/dto/minimal-room.dto';
import { MinimalUserDto } from 'src/modules/user/dto/minimal-user.dto';
import { BookingService } from './booking.service';
import { BookingDto } from './dto/booking.dto';
import { CreateEditBookingDto } from './dto/create-edit-booking.dto';

@Controller('booking')
@UseInterceptors(ClassSerializerInterceptor)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

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

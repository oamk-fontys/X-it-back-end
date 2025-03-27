import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateEditBookingDto } from './dto/create-edit-booking.dto';
import { RequestWithUser } from 'src/core/auth/auth.guard';
import { IsAuthenticated } from 'src/core/auth/auth.decorator';
import { BookingDto } from './dto/booking.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Get()
  @ApiOkResponse({
    description: 'Get all bookings',
    type: BookingDto,
    isArray: true,
  })
  @IsAuthenticated()
  async getAllBookingsByUserId(@Req() req: RequestWithUser) {
    return this.bookingService.getAllBookingsByUserId(req.user.id);
  }

  @Get('id')
  @ApiOkResponse({
    description: 'Get the current booking',
    type: BookingDto,
  })
  @IsAuthenticated()
  async getSingleBookingByUserId(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
  ) {
    return this.bookingService.getSingleBookingByUserId(req.user.id, id);
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

  @Get('/company/:companyId')
  @ApiOkResponse({
    description: 'Get all bookings by company ID',
    type: BookingDto,
    isArray: true,
  })
  @IsAuthenticated()
  async getAllBookingsByCompanyId(@Param('companyId') companyId: string) {
    return this.bookingService.getAllBookingsByCompanyId(companyId);
  }

  @Get('admin')
  @ApiOkResponse({
    description: 'Get all bookings for admins',
    type: BookingDto,
    isArray: true,
  })
  @IsAuthenticated()
  async getAllBookingsForAdmins(@Req() req: RequestWithUser) {
    return this.bookingService.getAllBookingsForAdmins();
  }

}

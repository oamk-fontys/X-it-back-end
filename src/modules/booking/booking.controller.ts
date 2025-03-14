import { Body, Controller, Get, Param, Post, Put, Delete, Req, UseGuards } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { CreateEditBookingDto } from "./dto/create-edit-booking.dto";
import { RequestWithUser } from "src/core/auth/auth.guard";
import { IsAuthenticated } from "src/core/auth/auth.decorator";
import { BookingDto } from "./dto/booking.dto";
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';

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
        const userId = req.user.id;
        return this.bookingService.getAllBookingsByUserId(req.user.id);
    }

    @Get('id')
    @ApiOkResponse({
        description: 'Get the current booking',
        type: BookingDto,
    })
    @IsAuthenticated()
    async getSingleBookingByUserId(@Req() req: RequestWithUser, @Param('id') id: string) {
        const userId = req.user.id;
        return this.bookingService.getSingleBookingByUserId(req.user.id, id);
    }

    @Post()
    @IsAuthenticated()
    async createBooking(@Req() req: RequestWithUser, @Body() booking: CreateEditBookingDto) {
        const userId = req.user.id;
        return this.bookingService.createBooking(booking, req.user.id);
    }


    @Put(':id')
    @IsAuthenticated()
    async updateBooking(@Req() req: RequestWithUser, @Param('id') id: string, @Body() booking: CreateEditBookingDto) {
        const userId = req.user.id;
        return this.bookingService.updateBooking(id, booking, userId);
    }

    @Delete(':id')
    @IsAuthenticated()
    async deleteBooking(@Param('id') id: string) {
        return this.bookingService.cancelBooking(id);
    }
}

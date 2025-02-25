import { Body, Controller, Get, Param, Post, Put, Delete, Req } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { CreateEditBookingDto } from "./dto/create-edit-booking.dto";
import { RequestWithUser } from "src/core/auth/auth.guard";

@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }


    @Get(':userId')
    async getAllBookingsByUserId(@Req() req: RequestWithUser) {
        return this.bookingService.getAllBookingsByUserId(req);
    }

    @Get(':userId, :id')
    async getSingleBookingByUserId(@Req() req: RequestWithUser, @Param('id') id: string) {
        return this.bookingService.getSingleBookingByUserId(req, id);
    }

    @Post(':userId')
    async createBooking(@Param('userId') userId: string, @Body() booking: CreateEditBookingDto) {
        return this.bookingService.createBooking(booking);
    }


    @Put(':id')
    async updateBooking(@Param('id') id: string, @Body() booking: CreateEditBookingDto) {
        return this.bookingService.updateBooking(id, booking);
    }

    @Delete(':id')
    async deleteBooking(@Param('id') id: string) {
        return this.bookingService.deleteBooking(id);
    }
}

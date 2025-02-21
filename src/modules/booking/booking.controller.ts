import { Body, Controller, Get, Param, Post, Put, Delete } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { CreateEditBookingDto } from "./dto/create-edit-booking.dto";

@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }


    @Get(':userId')
    async getAllBookingsByUserId(@Param('userId') userId: string) {
        return this.bookingService.getAllBookingsByUserId(userId);
    }

    @Get(':userId, :id')
    async getSingleBookingByUserId(@Param('id, userId') id: string, userId: string) {
        return this.bookingService.getSingleBookingByUserId(id, userId);
    }

    @Post(':userId')
    async createBooking(@Param('userId') userId: string, @Body() booking: CreateEditBookingDto) {
        return this.bookingService.createBooking(userId, booking);
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

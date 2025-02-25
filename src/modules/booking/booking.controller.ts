import { Body, Controller, Get, Param, Post, Put, Delete, Req, UseGuards } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { CreateEditBookingDto } from "./dto/create-edit-booking.dto";
import { RequestWithUser } from "src/core/auth/auth.guard";
import { IsAuthenticated } from "src/core/auth/auth.decorator";

@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @Get(':userId')
    @IsAuthenticated()
    async getAllBookingsByUserId(@Req() req: RequestWithUser, @Param('userId') userId: string) {
        return this.bookingService.getAllBookingsByUserId(req);
    }

    @Get(':userId/booking/:id')
    @IsAuthenticated()
    async getSingleBookingByUserId(@Req() req: RequestWithUser, @Param('userId') userId: string, @Param('id') id: string) {
        return this.bookingService.getSingleBookingByUserId(req, id);
    }

    @Post()
    @IsAuthenticated()
    async createBooking(@Body() booking: CreateEditBookingDto) {
        return this.bookingService.createBooking(booking);
    }

    @Put(':id')
    @IsAuthenticated()
    async updateBooking(@Param('id') id: string, @Body() booking: CreateEditBookingDto) {
        return this.bookingService.updateBooking(id, booking);
    }

    @Delete(':id')
    @IsAuthenticated()
    async deleteBooking(@Param('id') id: string) {
        return this.bookingService.deleteBooking(id);
    }
}

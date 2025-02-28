import { Body, Controller, Get, Param, Post, Put, Delete, Req, UseGuards } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { CreateEditBookingDto } from "./dto/create-edit-booking.dto";
import { RequestWithUser } from "src/core/auth/auth.guard";
import { IsAuthenticated } from "src/core/auth/auth.decorator";

@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @Get()
    @IsAuthenticated()
    async getAllBookingsByUserId(@Req() req: RequestWithUser) {
        const userId = req.user.id;
        return this.bookingService.getAllBookingsByUserId(userId);
    }

    @Get('booking/:id')
    @IsAuthenticated()
    async getSingleBookingByUserId(@Req() req: RequestWithUser, @Param('id') id: string) {
        const userId = req.user.id;
        return this.bookingService.getSingleBookingByUserId(userId, id);
    }

    @Post()
    @IsAuthenticated()
    async createBooking(@Req() req: RequestWithUser, @Body() booking: CreateEditBookingDto) {
        const userId = req.user.id;
        return this.bookingService.createBooking({ ...booking, userId });
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

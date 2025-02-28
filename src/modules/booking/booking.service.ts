import { Injectable, NotFoundException, ForbiddenException, Req } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma.service";
import { CreateEditBookingDto } from "./dto/create-edit-booking.dto";
import { IsAuthenticated } from "src/core/auth/auth.decorator";
import { BookingState } from "@prisma/client";

@Injectable()
export class BookingService {

    constructor(private readonly prisma: PrismaService) { }

    public async getAllBookingsByUserId(userId: string) {
        return await this.prisma.booking.findMany({
            where: {
                userId: userId
            }
        });
    }

    @IsAuthenticated()
    public async getSingleBookingByUserId(userId: string, id: string) {
        const booking = await this.prisma.booking.findFirst({
            where: {
                id: id,
                userId: userId
            },
        });

        if (!booking) {
            throw new NotFoundException('Booking not found');
        }

        return booking;
    }

    public async createBooking(body: CreateEditBookingDto, userId: string) {
        // Haal roomId en userId uit de DTO
        const roomId = body.roomDto.id;
        const userFromDto = body.userDto.id;

        // Controleer of de gebruiker uit de DTO overeenkomt met de geauthenticeerde gebruiker
        if (userFromDto !== userId) {
            throw new ForbiddenException('User mismatch: You can only create bookings for yourself');
        }

        // Controleer of de gebruiker bestaat
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Controleer of de kamer bestaat
        const room = await this.prisma.room.findUnique({
            where: { id: roomId.toString() },
        });

        if (!room) {
            throw new NotFoundException('Room not found');
        }

        // Maak een nieuwe booking met BookingState standaard op SCHEDULED
        const newBooking = await this.prisma.booking.create({
            data: {
                userId: userId,
                roomId: roomId.toString(),
                state: BookingState.SCHEDULED,
            },
        });

        return newBooking;
    }



    public async updateBooking(id: string, body: CreateEditBookingDto, userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const bookingToUpdate = await this.prisma.booking.findUnique({
            where: { id },
        });

        if (!bookingToUpdate) {
            throw new NotFoundException('Booking not found');
        }

        if (bookingToUpdate.userId !== userId) {
            throw new ForbiddenException('You are not allowed to update this booking');
        }

        return await this.prisma.booking.update({
            where: { id },
            data: {
                ...body,
                userId,
            },
        });
    }


    public async cancelBooking(id: string) {
        // Controleer of de booking bestaat
        const bookingToCancel = await this.prisma.booking.findUnique({
            where: { id },
        });

        if (!bookingToCancel) {
            throw new NotFoundException('Booking not found');
        }

        // Update de status naar BookingState.CANCELLED
        return await this.prisma.booking.update({
            where: { id },
            data: {
                state: BookingState.CANCELLED, // Gebruik de enum voor typeveiligheid
            },
        });
    }

}

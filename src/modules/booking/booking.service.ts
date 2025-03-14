import { Injectable, NotFoundException, ForbiddenException, Req } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma.service";
import { CreateEditBookingDto } from "./dto/create-edit-booking.dto";
import { IsAuthenticated } from "src/core/auth/auth.decorator";
import { BookingState } from "@prisma/client";
import { UserService } from "../user/user.service";
import { RoomService } from "../room/room.service";

@Injectable()
export class BookingService {

    constructor(private readonly prisma: PrismaService, private readonly userService: UserService, private readonly roomService: RoomService) { }

    public async getAllBookingsByUserId(userId: string) {
        return await this.prisma.booking.findMany({
            where: {
                userId: userId
            },
            include: {
                room: true
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
        if (body.userId !== userId) {
            throw new ForbiddenException('User mismatch: You can only create bookings for yourself');
        }
        const roomId = body.roomId;

        if (body.userId !== userId) {
            throw new ForbiddenException('User mismatch: You can only create bookings for yourself');
        }

        const user = await this.userService.getUserById(userId);
        const userExists = await this.userService.doesUserExist(user.email, user.username);
        if (!userExists) {
            throw new NotFoundException('User not found');
        }

        const roomExists = await this.roomService.doesRoomExist(roomId.toString());
        if (!roomExists) {
            throw new NotFoundException('Room not found');
        }

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
        const user = await this.userService.getUserById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }


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
                userId: body.userId,
                roomId: body.roomId.toString(),
            },
        });
    }


    public async cancelBooking(id: string) {
        const bookingToCancel = await this.prisma.booking.findUnique({
            where: { id },
        });

        if (!bookingToCancel) {
            throw new NotFoundException('Booking not found');
        }

        return await this.prisma.booking.update({
            where: { id },
            data: {
                state: BookingState.CANCELLED,
            },
        });
    }

}

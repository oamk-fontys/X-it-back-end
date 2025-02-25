import { Injectable, NotFoundException, Req } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma.service";
import { CreateEditBookingDto } from "./dto/create-edit-booking.dto";
import { IsAuthenticated } from "src/core/auth/auth.decorator";
import { RequestWithUser } from "src/core/auth/auth.guard";

@Injectable()
export class BookingService {

    constructor(private readonly prisma: PrismaService) { }

    @IsAuthenticated()
    public async getAllBookingsByUserId(@Req() req: RequestWithUser) {
        return await this.prisma.booking.findMany({
            where: {
                userId: req.user.id
            }
        });
    }


    @IsAuthenticated()
    public async getSingleBookingByUserId(@Req() req: RequestWithUser, id: string) {
        const booking = await this.prisma.booking.findFirst({
            where: {
                id: id,
                userId: req.user.id
            },
        });

        if (!booking) {
            throw new NotFoundException('Booking not found');
        }

        return booking;
    }


    public async createBooking(body: CreateEditBookingDto) {
        if (body.userId) {
            const user = await this.prisma.user.findUnique({
                where: { id: body.userId },
            });

            if (!user) {
                throw new NotFoundException('User not found');
            }
        }
        const newBooking = await this.prisma.booking.create({
            data: {
                ...body,
                userId: body.userId
            },
        });

        return newBooking;
    }


    public async updateBooking(id: string, body: CreateEditBookingDto) {
        if (body.userId) {
            const user = await this.prisma.user.findUnique({
                where: { id: body.userId },
            });

            if (!user) {
                throw new NotFoundException('User not found');
            }
        }
        const bookingToUpdate = await this.prisma.booking.findUnique({
            where: { id },
        });

        if (!bookingToUpdate) {
            throw new NotFoundException('Booking not found');
        }

        return await this.prisma.booking.update({
            where: { id },
            data: {
                ...body
            },
        });
    }

    public async deleteBooking(id: string) {
        const bookingToDelete = await this.prisma.booking.findUnique({
            where: { id },
        });

        if (!bookingToDelete) {
            throw new NotFoundException('Booking not found');
        }

        return await this.prisma.booking.delete({
            where: { id },
        });
    }
}

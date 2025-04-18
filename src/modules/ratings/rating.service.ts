import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { EditRatingDto } from './dto/edit-rating.dto';

@Injectable()
export class RatingService {
    constructor(private readonly prisma: PrismaService) { }

    public async getRatings(roomId: string) {
        return await this.prisma.rating.findMany({
            where: {
                roomId,
            },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                user: true,
            },
        });
    }

    public async getRatingById(id: string) {
        const rating = await this.prisma.rating.findUnique({
            where: { id },
        });

        if (!rating) {
            throw new NotFoundException('Rating not found');
        }

        return rating;
    }

    public async getAllRatingsByUserId(userId: string) {
        return await this.prisma.rating.findMany({
            where: {
                userId: userId,
            },
            include: {
                room: true,
                user: true,
            },
        });
    }

    public async createRating(body: CreateRatingDto, userId: string) {
        const room = await this.prisma.room.findUnique({
            where: { id: body.roomId },
        });

        if (!room) {
            throw new NotFoundException('Room not found');
        }

        const newRating = await this.prisma.rating.create({
            data: {
                ...body,
                userId,
                rating: body.rating,
            },
        });

        return newRating;
    }

    public async updateRating(id: string, body: EditRatingDto, userId: string) {
        const rating = await this.prisma.rating.findUnique({
            where: { id },
        });

        if (!rating) {
            throw new NotFoundException('Rating not found');
        }

        if (rating.userId !== userId) {
            throw new ForbiddenException(
                'You are not allowed to update this rating',
            );
        }

        return await this.prisma.rating.update({
            where: { id },
            data: {
                ...body,
            },
        });
    }

    public async deleteRating(id: string, userId: string) {
        const rating = await this.prisma.rating.findUnique({
            where: { id },
        });

        if (!rating) {
            throw new NotFoundException('Rating not found');
        }

        if (rating.userId !== userId) {
            throw new ForbiddenException(
                'You are not allowed to delete this rating',
            );
        }

        return await this.prisma.rating.delete({
            where: { id },
        });
    }

}
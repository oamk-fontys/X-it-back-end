import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma.service";
import { CreateEditRoomDto } from "./dto/create-edit-room.dto";

@Injectable()
export class RoomService {

    constructor(private readonly prisma: PrismaService) { }

    public async getRooms() {
        return await this.prisma.room.findMany();
    }

    public async getRoomById(id: string) {
        const room = await this.prisma.room.findUnique({
            where: { id },
        });

        if (!room) {
            throw new NotFoundException('Room not found'); // This returns a 404 error
        }

        return room;
    }

    public async createRoom(body: CreateEditRoomDto) {
        const company = await this.prisma.company.findUnique({
            where: { id: body.companyId },
        });

        if (!company) {
            throw new NotFoundException('Company not found');
        }
        const newRoom = await this.prisma.room.create({
            data: {
                // This is a spreat operator that spreads the body object into the create object
                ...body
            },
        });

        return newRoom;
    }

    public async updateRoom(id: string, body: CreateEditRoomDto) {
        if (body.companyId) {
            const company = await this.prisma.company.findUnique({
                where: { id: body.companyId },
            });

            if (!company) {
                throw new NotFoundException('Company not found');
            }
        }
        const roomToUpdate = await this.prisma.room.findUnique({
            where: { id },
        });

        if (!roomToUpdate) {
            throw new NotFoundException('Room not found');
        }

        return await this.prisma.room.update({
            where: { id },
            data: {
                ...body
            },
        });
    }

    public async deleteRoom(id: string) {
        const roomToDelete = await this.prisma.room.findUnique({
            where: { id },
        });

        if (!roomToDelete) {
            throw new NotFoundException('Room not found');
        }

        return await this.prisma.room.delete({
            where: { id },
        });
    }
}

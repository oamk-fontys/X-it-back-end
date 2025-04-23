import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingState } from '@prisma/client';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateEditRoomDto } from './dto/create-edit-room.dto';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  public async getRooms() {
    return await this.prisma.room.findMany({
      include: {
        logo: true,
        company: {
          include: {
            logo: true,
          },
        },
      },
    });
  }

  public async getRoomById(id: string) {
    const room = await this.prisma.room.findUnique({
      where: { id },
      include: {
        logo: true,
        company: {
          include: {
            logo: true,
          },
        },
      },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return room;
  }

  public async getRoomsByCompanyId(companyId: string) {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return await this.prisma.room.findMany({
      where: { companyId },
      include: {
        logo: true,
        company: {
          include: {
            logo: true,
          },
        },
      },
    });
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
        ...body,
      },
      include: {
        logo: true,
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
        ...body,
      },
      include: {
        logo: true,
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

  public async doesRoomExist(roomId: string): Promise<boolean> {
    const count = await this.prisma.room.count({
      where: { id: roomId },
    });
    return count > 0;
  }

  public async getVisitedRooms(userId: string) {
    return await this.prisma.room.findMany({
      where: {
        booking: {
          some: {
            userId,
            state: BookingState.DONE,
          },
        },
      },
      include: {
        logo: true,
        company: {
          include: {
            logo: true,
          },
        },
      },
      distinct: ['id'],
    });
  }
}

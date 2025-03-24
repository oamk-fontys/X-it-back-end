import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { UserDto } from '../user/dto/user.dto';
import { CreateEditGameDto } from './dto/create-edit-game.dto';
import { Role } from '@prisma/client';
import { BookingService } from '../booking/booking.service';
import { RoomService } from '../room/room.service';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService,
    private readonly bookingService: BookingService,
    private readonly roomService: RoomService,
  ) { }

  // Get all games
  public async getGames() {
    return await this.prisma.game.findMany();
  }

  // Get game by ID
  public async getGameById(id: string) {
    const game = await this.prisma.game.findUnique({
      where: { id },
    });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    return game;
  }

  // Create a new game
  public async createGame(body: CreateEditGameDto, user: UserDto) {

    const booking = await this.bookingService.getBookingById(body.bookingId);
    console.log('Booking retrieved:', booking);

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const room = await this.roomService.getRoomById(body.roomId);

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (user.role === Role.COMPANY || user.role === Role.ADMIN) {
      if (room.companyId !== user.company.id) {
        throw new ForbiddenException('You are not allowed to create a game in a room that belongs to another company');
      }
    }

    const newGame = await this.prisma.game.create({
      data: {
        ...body,
        startTime: body.startTime || null,
        endTime: body.endTime || null,
      },
    });

    return newGame;
  }

  // Full update of an existing game
  public async updateGame(id: string, body: CreateEditGameDto, user: UserDto) {
    const room = await this.prisma.room.findUnique({
      where: { id: body.roomId },
    });

    if (body.roomId && !room) {
      throw new NotFoundException('Room not found');
    }

    await this.hasAccessToGame(id, user)

    const gameToUpdate = await this.prisma.game.findUnique({
      where: { id },
    });

    if (!gameToUpdate) {
      throw new NotFoundException('Game not found');
    }

    return await this.prisma.game.update({
      where: { id },
      data: {
        ...body,
        startTime: body.startTime ?? gameToUpdate.startTime,
        endTime: body.endTime ?? gameToUpdate.endTime,
      },
    });
  }

  // Partial update of an existing game (PATCH)
  public async partialUpdateGame(id: string, body: Partial<CreateEditGameDto>, user: UserDto) {
    const room = await this.prisma.room.findUnique({
      where: { id: body.roomId },
    });

    if (body.roomId && !room) {
      throw new NotFoundException('Room not found');
    }

    await this.hasAccessToGame(id, user)

    const gameToUpdate = await this.prisma.game.findUnique({
      where: { id },
    });

    if (!gameToUpdate) {
      throw new NotFoundException('Game not found');
    }

    // Only update the fields that are provided in the request
    const updatedGameData = {
      ...gameToUpdate,
      ...body, // Overwrite only the fields provided in the request
      startTime: body.startTime ?? gameToUpdate.startTime,
      endTime: body.endTime ?? gameToUpdate.endTime,
    };

    return await this.prisma.game.update({
      where: { id },
      data: updatedGameData,
    });
  }

  // Delete a game
  public async deleteGame(id: string, user: UserDto) {
    const gameToDelete = await this.prisma.game.findUnique({
      where: { id },
    });

    if (!gameToDelete) {
      throw new NotFoundException('Game not found');
    }

    await this.hasAccessToGame(id, user)

    return await this.prisma.game.delete({
      where: { id },
    });
  }

  private async hasAccessToGame(gameId: string, user: UserDto): Promise<void> {
    const game = await this.prisma.game.findUnique({
      where: { id: gameId },
      include: {
        room: {
          include: {
            company: true,
          },
        },
      },
    });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    if (user.role === Role.COMPANY || user.role === Role.ADMIN) {
      if (game.room.company?.id !== user.company.id) {
        throw new ForbiddenException('You are not allowed to modify this game');
      }
    }
  }
}
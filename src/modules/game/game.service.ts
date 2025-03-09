import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { Game } from '@prisma/client';
import { CreateEditGameDto } from './dto/create-edit-game.dto';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) { }

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
  public async createGame(body: CreateEditGameDto) {
    // Ensure the room exists before proceeding
    const room = await this.prisma.room.findUnique({
      where: { id: body.roomId },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    // Create the game record, allowing null for startTime and endTime
    const newGame = await this.prisma.game.create({
      data: {
        ...body,
        startTime: body.startTime || null, // if startTime is provided, use it; otherwise, set it to null
        endTime: body.endTime || null, // if endTime is provided, use it; otherwise, set it to null
      },
    });

    return newGame;
  }

  // Full update of an existing game
  public async updateGame(id: string, body: CreateEditGameDto) {
    const room = await this.prisma.room.findUnique({
      where: { id: body.roomId },
    });

    if (body.roomId && !room) {
      throw new NotFoundException('Room not found');
    }

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
  public async partialUpdateGame(id: string, body: Partial<CreateEditGameDto>) {
    const room = await this.prisma.room.findUnique({
      where: { id: body.roomId },
    });

    if (body.roomId && !room) {
      throw new NotFoundException('Room not found');
    }

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
  public async deleteGame(id: string) {
    const gameToDelete = await this.prisma.game.findUnique({
      where: { id },
    });

    if (!gameToDelete) {
      throw new NotFoundException('Game not found');
    }

    return await this.prisma.game.delete({
      where: { id },
    });
  }
}
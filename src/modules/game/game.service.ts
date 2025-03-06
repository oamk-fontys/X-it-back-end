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

  // Update an existing game
  public async updateGame(id: string, body: CreateEditGameDto) {
    // Ensure the room exists before proceeding
    const room = await this.prisma.room.findUnique({
      where: { id: body.roomId },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    // Find the game to update
    const gameToUpdate = await this.prisma.game.findUnique({
      where: { id },
    });

    if (!gameToUpdate) {
      throw new NotFoundException('Game not found');
    }

    // Update game fields, allowing null for startTime and endTime
    return await this.prisma.game.update({
      where: { id },
      data: {
        ...body,
        startTime: body.startTime ?? gameToUpdate.startTime, // If not provided, keep the existing value
        endTime: body.endTime ?? gameToUpdate.endTime, // If not provided, keep the existing value
      },
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
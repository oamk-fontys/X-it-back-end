import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { Game } from '@prisma/client';
import { CreateGameDto, UpdateGameDto } from './dto/game.dto';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new game
  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    return this.prisma.game.create({
      data: createGameDto,
    });
  }

  // Update an existing game
  async updateGame(gameId: string, updateGameDto: UpdateGameDto): Promise<Game> {
    return this.prisma.game.update({
      where: { id: gameId },
      data: updateGameDto,
    });
  }

  // Get a game by ID
  async getGameById(gameId: string): Promise<Game | null> {
    return this.prisma.game.findUnique({
      where: { id: gameId },
      include: {
        players: true, // Include players in the game
        statistics: true, // Include statistics if available
      },
    });
  }

  // Get all games
  async getAllGames(): Promise<Game[]> {
    return this.prisma.game.findMany({
      include: {
        players: true,
      },
    });
  }
}


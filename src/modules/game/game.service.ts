import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { Game } from '@prisma/client';
import { GameDto } from './dto/game.dto';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new game
  async createGame(gameDto: GameDto): Promise<Game> {
    return this.prisma.game.create({
      data: gameDto,
    });
  }

  // Update an existing game
  async updateGame(gameId: string, gameDto: Partial<GameDto>): Promise<Game> {
    return this.prisma.game.update({
      where: { id: gameId },
      data: gameDto,
    });
  }

  // Get a game by ID
  async getGameById(gameId: string): Promise<Game | null> {
    return this.prisma.game.findUnique({
      where: { id: gameId },
      include: {
        players: true, // Include players in the game
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

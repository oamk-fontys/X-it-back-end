import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { Player } from '@prisma/client';
import { CreatePlayerDto, UpdatePlayerDto } from './dto/player.dto';

@Injectable()
export class PlayerService {
  constructor(private readonly prisma: PrismaService) {}

  // Add/Create a new player in a game
  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.prisma.player.create({
      data: {
        gameId: createPlayerDto.gameId,
        userId: createPlayerDto.userId || null,
        isGuest: createPlayerDto.isGuest,
        isAdult: createPlayerDto.isAdult,
      },
    });
  }

  // Update a player's information
  async updatePlayer(playerId: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    return this.prisma.player.update({
      where: { id: playerId },
      data: updatePlayerDto, // Now using the DTO directly
    });
  }

  // Get a single player by ID
  async getPlayerById(playerId: string): Promise<Player | null> {
    return this.prisma.player.findUnique({
      where: { id: playerId },
      include: {
        game: true, // Include related game data
        user: true, // Include related user data
      },
    });
  }

  // Get all players in a specific game
  async getPlayersByGame(gameId: string): Promise<Player[]> {
    return this.prisma.player.findMany({
      where: { gameId },
      include: {
        user: true, // Include user details
      },
    });
  }

  // Remove a player from a game
  async deletePlayer(playerId: string): Promise<Player> {
    return this.prisma.player.delete({
      where: { id: playerId },
    });
  }
}


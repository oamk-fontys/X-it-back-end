import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { CreateEditPlayerDto } from './dto/create-edit-player.dto';
import { Player } from '@prisma/client';

@Injectable()
export class PlayerService {
  constructor(private readonly prisma: PrismaService) { }

  // Get all players in a specific game
  public async getPlayersByGame(gameId: string): Promise<Player[]> {
    return await this.prisma.player.findMany({
      where: { gameId },
      include: {
        user: true, // Include user details
      },
    });
  }

  // Get a single player by ID
  public async getPlayerById(id: string): Promise<Player> {
    const player = await this.prisma.player.findUnique({
      where: { id: id },
      include: {
        game: true, // Include related game data
        user: true, // Include related user data
      },
    });

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    return player;
  }

  // Add/Create a new player in a game
  public async createPlayer(body: CreateEditPlayerDto): Promise<Player> {
    const game = await this.prisma.game.findUnique({
      where: { id: body.gameId },
    });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    if (body.userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: body.userId },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }
    }

    const newPlayer = await this.prisma.player.create({
      data: {
        gameId: body.gameId,
        userId: body.userId || null,
        isGuest: body.isGuest,
        isAdult: body.isAdult,
      },
    });

    return newPlayer;
  }

  // Remove a player from a game
  public async deletePlayer(id: string): Promise<Player> {
    const playerToDelete = await this.prisma.player.findUnique({
      where: { id: id },
    });

    if (!playerToDelete) {
      throw new NotFoundException('Player not found');
    }

    return await this.prisma.player.delete({
      where: { id: id },
    });
  }
}

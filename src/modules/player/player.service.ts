import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { CreateEditPlayerDto } from './dto/create-edit-player.dto';
import { Player, Role } from '@prisma/client';
import { UserDto } from '../user/dto/user.dto';

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
        game: true,
        user: true,
      },
    });

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    return player;
  }

  public async createPlayer(body: CreateEditPlayerDto, user: UserDto): Promise<Player> {
    const game = await this.prisma.game.findUnique({
      where: { id: body.gameId },
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
      if (!game.room.company || game.room.company.id !== user.company.id) {
        throw new ForbiddenException('You do not have permission to add players to this game');
      }
    }

    let playerUser;
    if (body.userId) {
      playerUser = await this.prisma.user.findUnique({
        where: { id: body.userId },
      });

      if (!playerUser) {
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
      include: {
        user: true,
      },
    });

    return newPlayer;
  }

  // Remove a player from a game
  public async deletePlayer(id: string, user: UserDto): Promise<Player> {
    const playerToDelete = await this.prisma.player.findUnique({
      where: { id: id },
    });

    if (!playerToDelete) {
      throw new NotFoundException('Player not found');
    }

    await this.hasAccessToPlayer(id, user);

    return await this.prisma.player.delete({
      where: { id: id },
    });
  }

  private async hasAccessToPlayer(playerId: string, user: UserDto): Promise<void> {
    const player = await this.prisma.player.findUnique({
      where: { id: playerId },
      include: {
        game: {
          include: {
            room: {
              include: {
                company: true,
              },
            },
          },
        },
      },
    });

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    if (user.role === Role.COMPANY || user.role === Role.ADMIN) {
      if (player.game.room.company?.id !== user.company.id) {
        throw new ForbiddenException('You are not allowed to delete this player');
      }
    }
  }
}

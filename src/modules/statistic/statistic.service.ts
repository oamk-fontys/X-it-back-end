import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateStatisticDto } from './dto/create-statistic.dto';

@Injectable()
export class StatisticService {
  constructor(private readonly prisma: PrismaService) {}

  public async createStatistic(statisticDto: CreateStatisticDto) {
    const game = await this.prisma.game.findUnique({
      where: {
        id: statisticDto.gameId,
      },
      include: {
        room: {
          select: {
            duration: true,
          },
        },
        players: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    if (!game.startTime || !game.endTime) {
      throw new Error('Game start or end time not set');
    }

    // Calculate time of completion in milliseconds
    const timeOfCompletion = game.endTime.getTime() - game.startTime.getTime();

    // Calculate score based on time and hints used
    // Base score of 1000, deduct points for time and hints
    let score = 1000;

    // Deduct points for time taken (more time = lower score)
    // Use room duration as the target completion time
    const roomDurationMs = game.room.duration * 60 * 1000; // Convert minutes to ms
    const timeDeduction = Math.min(
      400,
      Math.floor((timeOfCompletion / roomDurationMs) * 400),
    );
    score -= timeDeduction;

    // Deduct points for hints used (more hints = lower score)
    // Each hint costs 100 points, up to 600 points max deduction
    const hintsDeduction = Math.min(600, statisticDto.hintsUsed * 100);
    score -= hintsDeduction;

    // Ensure minimum score of 0
    score = Math.max(0, score);

    return await this.prisma.statistic.createMany({
      data: game.players
        .filter(
          (player): player is { userId: string } => player.userId !== null,
        )
        .map((player) => ({
          hintsUsed: statisticDto.hintsUsed,
          score,
          gameId: statisticDto.gameId,
          userId: player.userId,
          timeOfCompletion,
        })),
    });
  }

  async getStatisticByGameId(gameId: string, userId: string) {
    return await this.prisma.statistic.findFirst({
      where: {
        userId,
        gameId,
      },
      include: {
        game: true,
      },
    });
  }
}

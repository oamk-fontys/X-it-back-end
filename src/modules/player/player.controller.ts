import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from '@prisma/client';
import { CreatePlayerDto, UpdatePlayerDto } from './dto/player.dto';

@Controller('Player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  // Add a player to a game (Uses DTO for validation & type safety)
  @Post('add')
  async addPlayer(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playerService.createPlayer(createPlayerDto);
  }

  // Update player information (Uses DTO for partial updates)
  @Patch(':playerId')
  async updatePlayer(
    @Param('playerId') playerId: string,
    @Body() updatePlayerDto: UpdatePlayerDto
  ): Promise<Player> {
    return this.playerService.updatePlayer(playerId, updatePlayerDto);
  }

  // Get a player by ID
  @Get(':playerId')
  async getPlayerById(@Param('playerId') playerId: string): Promise<Player | null> {
    return this.playerService.getPlayerById(playerId);
  }

  // Get all players in a specific game
  @Get('game/:gameId')
  async getPlayersByGame(@Param('gameId') gameId: string): Promise<Player[]> {
    return this.playerService.getPlayersByGame(gameId);
  }

  // Delete a player by ID
  @Delete(':playerId')
  async deletePlayer(@Param('playerId') playerId: string): Promise<Player> {
    return this.playerService.deletePlayer(playerId);
  }
}
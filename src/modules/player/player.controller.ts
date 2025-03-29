import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlayerService } from './player.service';
import { CreateEditPlayerDto } from './dto/create-edit-player.dto';
import { PlayerDto } from './dto/player.dto';
import { Role } from '@prisma/client';
import { IsAuthenticated } from 'src/core/auth/auth.decorator';
import { RequestWithUser } from 'src/core/auth/auth.guard';

@ApiTags('Player')
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) { }

  // Get a player by ID
  @Get(':id')
  @ApiOkResponse({
    description: 'Retrieve a player by ID',
    type: PlayerDto,
  })
  async getPlayerById(@Param('id') id: string) {
    return this.playerService.getPlayerById(id);
  }

  // Get all players in a specific game
  @Get('game/:gameId')
  @ApiResponse({
    status: 200,
    description: 'Retrieve all players in a specific game',
    type: [PlayerDto],
  })
  async getPlayersByGame(@Param('gameId') gameId: string) {
    return this.playerService.getPlayersByGame(gameId);
  }

  // Create a new player in a game
  @Post()
  @IsAuthenticated([Role.COMPANY, Role.ADMIN])
  @ApiResponse({
    status: 201,
    description: 'Create a new player in a game',
    type: PlayerDto,
  })
  async createPlayer(@Body() body: CreateEditPlayerDto, @Req() req: RequestWithUser) {
    return this.playerService.createPlayer(body, req.user);
  }

  // Delete a player by ID
  @Delete(':id')
  @IsAuthenticated([Role.COMPANY, Role.ADMIN])
  @ApiOkResponse({
    description: 'Delete a player from the game',
  })
  async deletePlayer(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.playerService.deletePlayer(id, req.user);
  }
}
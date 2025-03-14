import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlayerService } from './player.service';
import { CreateEditPlayerDto } from './dto/create-edit-player.dto';
import { PlayerDto } from './dto/player.dto';

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
  @ApiResponse({
    status: 201,
    description: 'Create a new player in a game',
    type: PlayerDto,
  })
  async createPlayer(@Body() body: CreateEditPlayerDto) {
    return this.playerService.createPlayer(body);
  }

  // Delete a player by ID
  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete a player from the game',
  })
  async deletePlayer(@Param('id') id: string) {
    return this.playerService.deletePlayer(id);
  }
}
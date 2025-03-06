import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateEditGameDto } from './dto/create-edit-game.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) { }

  // Get all games
  @Get()
  async getGames() {
    return this.gameService.getGames();
  }

  // Get game by ID
  @Get(':id')
  async getGameById(@Param('id') id: string) {
    return this.gameService.getGameById(id);
  }

  // Create a new game
  @Post()
  async createGame(@Body() body: CreateEditGameDto) {
    return this.gameService.createGame(body);
  }

  // Update an existing game
  @Put(':id')
  async updateGame(@Param('id') id: string, @Body() body: CreateEditGameDto) {
    return this.gameService.updateGame(id, body);
  }

  // Delete a game
  @Delete(':id')
  async deleteGame(@Param('id') id: string) {
    return this.gameService.deleteGame(id);
  }
}
import { Body, Controller, Get, Param, Post, Put, Delete, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GameService } from './game.service';
import { CreateEditGameDto } from './dto/create-edit-game.dto';
import { GameDto } from './dto/game.dto';

@ApiTags('Game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) { }

  // Get all games
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Retrieve all games',
    type: [GameDto],
  })
  async getGames() {
    return this.gameService.getGames();
  }

  // Get game by ID
  @Get(':id')
  @ApiOkResponse({
    description: 'Retrieve a game by ID',
    type: GameDto,
  })
  async getGameById(@Param('id') id: string) {
    return this.gameService.getGameById(id);
  }

  // Create a new game
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create a new game',
    type: GameDto,
  })
  async createGame(@Body() body: CreateEditGameDto) {
    return this.gameService.createGame(body);
  }

  // Update an existing game (Full Update)
  @Put(':id')
  @ApiOkResponse({
    description: 'Update an existing game',
    type: GameDto,
  })
  async updateGame(@Param('id') id: string, @Body() body: CreateEditGameDto) {
    return this.gameService.updateGame(id, body);
  }

  // Partial update of an existing game
  @Patch(':id')
  @ApiOkResponse({
    description: 'Partial update of an existing game for start and end time',
    type: GameDto,
  })
  async partialUpdateGame(
    @Param('id') id: string,
    @Body() body: Partial<CreateEditGameDto>,
  ) {
    return this.gameService.partialUpdateGame(id, body);
  }

  // Delete a game
  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete a game',
  })
  async deleteGame(@Param('id') id: string) {
    return this.gameService.deleteGame(id);
  }
}
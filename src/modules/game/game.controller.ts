import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto, UpdateGameDto } from './dto/game.dto';
import { Game } from '@prisma/client';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  // Create a new game
  @Post()
  async createGame(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return this.gameService.createGame(createGameDto);
  }

  // Update a game
  @Patch(':gameId')
  async updateGame(
    @Param('gameId') gameId: string,
    @Body() updateGameDto: UpdateGameDto
  ): Promise<Game> {
    return this.gameService.updateGame(gameId, updateGameDto);
  }

  // Automatically set startTime
  @Patch(':gameId/start')
  async startGame(@Param('gameId') gameId: string): Promise<Game> {
    return this.gameService.updateGame(gameId, { startTime: new Date() });
  }

  // Automatically set endTime
  @Patch(':gameId/end')
  async endGame(@Param('gameId') gameId: string): Promise<Game> {
    return this.gameService.updateGame(gameId, { endTime: new Date() });
  }

  // Get a game by ID
  @Get(':gameId')
  async getGameById(@Param('gameId') gameId: string): Promise<Game | null> {
    return this.gameService.getGameById(gameId);
  }

  // Get all games
  @Get()
  async getAllGames(): Promise<Game[]> {
    return this.gameService.getAllGames();
  }
}

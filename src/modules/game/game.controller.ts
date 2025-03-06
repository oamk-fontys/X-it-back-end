import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { GameDto } from './dto/game.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Game } from '@prisma/client'; // Game is a TypeScript type, not a class

@ApiTags('Game')
@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  // Create a new game
  @Post()
  @ApiOperation({ summary: 'Create a new game' })
  @ApiResponse({ status: 201, description: 'Game successfully created', type: GameDto }) // ✅ Use GameDto instead of Game
  async createGame(@Body() gameDto: GameDto): Promise<Game> {
    return this.gameService.createGame(gameDto);
  }

  // Update a game
  @Patch(':gameId')
  @ApiOperation({ summary: 'Update a game' })
  @ApiResponse({ status: 200, description: 'Game successfully updated', type: GameDto }) // ✅ Use GameDto
  async updateGame(@Param('gameId') gameId: string, @Body() gameDto: Partial<GameDto>): Promise<Game> {
    return this.gameService.updateGame(gameId, gameDto);
  }

  // Automatically set startTime
  @Patch(':gameId/start')
  @ApiOperation({ summary: 'Start the game (set startTime)' })
  @ApiResponse({ status: 200, description: 'Game start time updated', type: GameDto }) // ✅ Use GameDto
  async startGame(@Param('gameId') gameId: string): Promise<Game> {
    return this.gameService.updateGame(gameId, { startTime: new Date().toISOString() });
  }

  // Automatically set endTime
  @Patch(':gameId/end')
  @ApiOperation({ summary: 'End the game (set endTime)' })
  @ApiResponse({ status: 200, description: 'Game end time updated', type: GameDto }) // ✅ Use GameDto
  async endGame(@Param('gameId') gameId: string): Promise<Game> {
    return this.gameService.updateGame(gameId, { endTime: new Date().toISOString() });
  }

  // Get a game by ID
  @Get(':gameId')
  @ApiOperation({ summary: 'Get game by ID' })
  @ApiResponse({ status: 200, description: 'Game retrieved successfully', type: GameDto }) // ✅ Use GameDto
  async getGameById(@Param('gameId') gameId: string): Promise<Game | null> {
    return this.gameService.getGameById(gameId);
  }

  // Get all games
  @Get()
  @ApiOperation({ summary: 'Get all games' })
  @ApiResponse({ status: 200, description: 'All games retrieved successfully', type: [GameDto] }) // ✅ Use GameDto[]
  async getAllGames(): Promise<Game[]> {
    return this.gameService.getAllGames();
  }
}

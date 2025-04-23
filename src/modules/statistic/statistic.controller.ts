import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsAuthenticated } from 'src/core/auth/auth.decorator';
import { RequestWithUser } from 'src/core/auth/auth.guard';
import { ResponseInterceptor } from 'src/core/interceptor/response.interceptor';
import { MinimalGameDto } from '../game/dto/game.dto';
import { MinimalRoomDto } from '../room/dto/minimal-room.dto';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { StatisticDto } from './dto/statistic.dto';
import { StatisticService } from './statistic.service';

@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get()
  @ApiOperation({ summary: 'Get all statistics' })
  @ApiResponse({
    status: 200,
    description: 'The statistics have been successfully retrieved.',
    type: StatisticDto,
  })
  @IsAuthenticated()
  @UseInterceptors(
    new ResponseInterceptor(StatisticDto, {
      game: MinimalGameDto,
      room: MinimalRoomDto,
    }),
  )
  async getStatistics(@Req() req: RequestWithUser) {
    return this.statisticService.getStatistics(req.user.id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a statistic' })
  @ApiResponse({
    status: 201,
    description: 'The statistic has been successfully created.',
    type: CreateStatisticDto,
  })
  @ApiBody({ type: CreateStatisticDto })
  async createStatistic(@Body() statisticDto: CreateStatisticDto) {
    return this.statisticService.createStatistic(statisticDto);
  }

  @Get(':gameId')
  @ApiOperation({ summary: 'Get a statistic by game id' })
  @ApiResponse({
    status: 200,
    description: 'The statistic has been successfully retrieved.',
    type: StatisticDto,
  })
  @IsAuthenticated()
  @UseInterceptors(
    new ResponseInterceptor(StatisticDto, {
      game: MinimalGameDto,
    }),
  )
  async getStatisticByGameId(
    @Param('gameId') gameId: string,
    @Req() req: RequestWithUser,
  ) {
    return this.statisticService.getStatisticByGameId(
      gameId,
      req.user.id,
      req.user.role === Role.COMPANY,
    );
  }
}

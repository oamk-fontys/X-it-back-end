/////////////////////////player.module.ts
import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PrismaService } from '../../core/database/prisma.service';
import { GameService } from '../game/game.service';
import { RoomService } from '../room/room.service';
import { UserService } from '../user/user.service';
import { BookingService } from '../booking/booking.service';

@Module({
  controllers: [PlayerController],
  providers: [PlayerService, PrismaService, GameService, UserService, RoomService, BookingService],
  exports: [PlayerService],
})
export class PlayerModule { }

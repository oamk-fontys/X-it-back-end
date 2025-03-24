import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { PrismaService } from '../../core/database/prisma.service';
import { BookingService } from '../booking/booking.service';
import { UserService } from '../user/user.service';
import { RoomService } from '../room/room.service';

@Module({
  controllers: [GameController],
  providers: [GameService, PrismaService, BookingService, UserService, RoomService],
  exports: [GameService],
})
export class GameModule { }
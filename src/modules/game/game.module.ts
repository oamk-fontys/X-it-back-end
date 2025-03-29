import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { PrismaService } from '../../core/database/prisma.service';
import { BookingService } from '../booking/booking.service';
import { UserService } from '../user/user.service';
import { RoomService } from '../room/room.service';
import { TimeSlotModule } from "../time-slot/time-slot.module";
import { UserModule } from "../user/user.module";
import { RoomModule } from "../room/room.module";

@Module({
  controllers: [GameController],
  providers: [GameService, PrismaService, BookingService, UserService, RoomService],
  imports: [TimeSlotModule, UserModule, RoomModule],
  exports: [GameService],
})
export class GameModule { }
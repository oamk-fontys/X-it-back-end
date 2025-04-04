import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth/auth.module';
import { PrismaService } from './core/database/prisma.service';
import { BookingModule } from './modules/booking/booking.module';
import { CompanyModule } from './modules/company/company.module';
import { FileModule } from './modules/file/file.module';
import { GameModule } from './modules/game/game.module';
import { PlayerModule } from './modules/player/player.module';
import { RoomModule } from './modules/room/room.module';
import { TimeSlotModule } from './modules/time-slot/time-slot.module';
import { UserModule } from './modules/user/user.module';
import { CommentModule } from './modules/comment/comment.module';
@Module({
  imports: [
    UserModule,
    AuthModule,
    CompanyModule,
    RoomModule,
    TimeSlotModule,
    GameModule,
    PlayerModule,
    BookingModule,
    FileModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }

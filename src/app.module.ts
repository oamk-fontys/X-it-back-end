import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth/auth.module';
import { PrismaService } from './core/database/prisma.service';
import { BookingModule } from './modules/booking/booking.module';
import { CommentModule } from './modules/comment/comment.module';
import { CompanyModule } from './modules/company/company.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { FileModule } from './modules/file/file.module';
import { GameModule } from './modules/game/game.module';
import { PlayerModule } from './modules/player/player.module';
import { RatingModule } from './modules/rating/rating.module';
import { RoomModule } from './modules/room/room.module';
import { StatisticModule } from './modules/statistic/statistic.module';
import { TimeSlotModule } from './modules/time-slot/time-slot.module';
import { UserModule } from './modules/user/user.module';
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
    EmployeeModule,
    RatingModule,
    StatisticModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

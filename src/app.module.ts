import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth/auth.module';
import { PrismaService } from './core/database/prisma.service';
import { CompanyModule } from './modules/company/company.module';
import { PetModule } from './modules/pet/pet.module';
import { RoomModule } from './modules/room/room.module';
import { UserModule } from './modules/user/user.module';
import { GameModule } from './modules/game/game.module'; 
import { PlayerModule } from './modules/player/player.module';

@Module({
  imports: [PetModule, UserModule, AuthModule, CompanyModule, RoomModule, GameModule, PlayerModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }

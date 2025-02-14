import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './core/database/prisma.service';
import { PetModule } from './modules/pet/pet.module';
import { RoomModule } from './modules/room/room.module';

@Module({
  imports: [PetModule, RoomModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }

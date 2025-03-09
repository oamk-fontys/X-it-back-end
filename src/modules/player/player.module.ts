/////////////////////////player.module.ts
import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PrismaService } from '../../core/database/prisma.service';

@Module({
  controllers: [PlayerController], // Registers the controller
  providers: [PlayerService, PrismaService], // Registers services
  exports: [PlayerService], // Makes PlayerService available for other modules if needed
})
export class PlayerModule {}

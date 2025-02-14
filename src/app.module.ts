import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './core/database/prisma.service';
import { PetModule } from './modules/pet/pet.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [PetModule, UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

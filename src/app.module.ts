import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './core/database/prisma.service';
import { PetModule } from './modules/pet/pet.module';
import { CompanyModule } from './modules/company/company.module';

@Module({
  imports: [PetModule, CompanyModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }

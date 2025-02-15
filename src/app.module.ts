import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth/auth.module';
import { PrismaService } from './core/database/prisma.service';
import { CompanyModule } from './modules/company/company.module';
import { PetModule } from './modules/pet/pet.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [PetModule, UserModule, AuthModule, CompanyModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }

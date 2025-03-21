import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { FileController } from './file.controller';
import { FileRepository } from './file.repository';
import { FileService } from './file.service';

@Module({
  imports: [HttpModule],
  providers: [FileService, PrismaService, FileRepository],
  exports: [FileService],
  controllers: [FileController],
})
export class FileModule {}

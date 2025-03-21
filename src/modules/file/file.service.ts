import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { FileRepository } from './file.repository';

@Injectable()
export class FileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileRepository: FileRepository,
  ) {}

  async uploadFile(buffer: Buffer) {
    const uploadFile = await this.fileRepository.uploadFile(buffer);

    return await this.prisma.file.create({
      data: {
        url: uploadFile.url,
        key: uploadFile.key,
        mimeType: uploadFile.mimeType,
      },
    });
  }
}

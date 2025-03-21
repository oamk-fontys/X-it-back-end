import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { IsAuthenticated } from 'src/core/auth/auth.decorator';
import { FileDto } from './dto/file.dto';
import { FileValidationPipe } from './file.pipe';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/upload')
  @ApiOkResponse({
    description: 'Successfully uploaded file',
    type: FileDto,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @IsAuthenticated()
  async uploadFile(
    @UploadedFile(new FileValidationPipe(1000))
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No valid file found');
    }

    return await this.fileService.uploadFile(file.buffer);
  }
}

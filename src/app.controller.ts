import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { AppService } from './app.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello() {
    return this.appService.getHello();
  }

  @Get('file')
  @ApiExcludeEndpoint()
  serveStatic(@Param('*') path: string, @Res() res: Response) {
    console.log('serveStatic', path);
    const filePath = join(__dirname, '..', 'public', path || 'index.html');
    return res.sendFile(filePath);
  }
}

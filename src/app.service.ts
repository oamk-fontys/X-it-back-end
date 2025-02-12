import { Injectable } from '@nestjs/common';
import { PrismaService } from './core/database/prisma.service';

@Injectable()
export class AppService {

  constructor(private readonly prisma: PrismaService) {}

  getHello() {
    return this.prisma.user.findMany();
  }
}

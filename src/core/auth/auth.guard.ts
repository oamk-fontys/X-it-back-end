import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { Request } from 'express';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { PrismaService } from '../database/prisma.service';
import { ROLES_KEY } from './auth.decorator';
import { jwtConstants } from './constants';

export type RequestWithUser = Request & { user: UserDto };

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get required roles from decorator metadata
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
        include: {
          company: true,
          profilePicture: true,
        },
      });

      if (!user) {
        throw new UnauthorizedException('Unauthorized, Unknown user');
      }

      request['user'] = user;
      console.log(request['user']);

      // Check if user has required role
      if (requiredRoles.length !== 0 && !requiredRoles.includes(payload.role)) {
        throw new ForbiddenException('Insufficient permissions');
      }
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

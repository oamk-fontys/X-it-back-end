import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { AuthGuard } from './auth.guard';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export function IsAuthenticated(roles: Role | Role[] = []) {
  const roleArray = Array.isArray(roles) ? roles : [roles];
  return applyDecorators(
    Roles(...roleArray),
    UseGuards(AuthGuard),
    ApiBearerAuth()
  );
}

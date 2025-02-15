import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from '@prisma/client';
import { AuthGuard } from './auth.guard';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export function IsAuthenticated(roles: Role | Role[] = Role.USER) {
  const roleArray = Array.isArray(roles) ? roles : [roles];
  return applyDecorators(
    Roles(...roleArray),
    UseGuards(AuthGuard)
  );
}

import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { Role } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export function IsAuthenticated(role: Role = Role.USER) {
  return applyDecorators(
    Roles(role),
    UseGuards(AuthGuard)
  );
}

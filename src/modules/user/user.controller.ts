import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsAuthenticated } from 'src/core/auth/auth.decorator';
import { RequestWithUser } from 'src/core/auth/auth.guard';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all users',
    type: UserDto,
    isArray: true,
  })
  @IsAuthenticated(Role.ADMIN)
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get('me')
  @ApiOkResponse({
    description: 'Get the current user',
    type: UserDto,
  })
  @IsAuthenticated()
  async getMe(@Req() req: RequestWithUser) {
    return req.user;
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Get a user by ID',
    type: UserDto,
  })
  @IsAuthenticated(Role.ADMIN)
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}

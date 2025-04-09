import { Controller, Get, Param, Req, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsAuthenticated } from 'src/core/auth/auth.decorator';
import { RequestWithUser } from 'src/core/auth/auth.guard';
import { ResponseInterceptor } from 'src/core/interceptor/response.interceptor';
import { FileDto } from '../file/dto/file.dto';
import { MinimalUserDto } from './dto/minimal-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get all users',
    type: MinimalUserDto,
    isArray: true,
  })
  @UseInterceptors(
    new ResponseInterceptor(MinimalUserDto, {
      profilePicture: FileDto,
    }),
  )
  @IsAuthenticated(Role.ADMIN)
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get('me')
  @ApiOkResponse({
    description: 'Get the current user',
    type: MinimalUserDto,
  })
  @UseInterceptors(
    new ResponseInterceptor(MinimalUserDto, {
      profilePicture: FileDto,
    }),
  )
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

import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { ApiOkResponse, ApiResponse } from "@nestjs/swagger";

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
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Get a user by ID',
    type: UserDto,
  })
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}

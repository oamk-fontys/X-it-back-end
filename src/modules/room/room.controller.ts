import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsAuthenticated } from 'src/core/auth/auth.decorator';
import { RequestWithUser } from 'src/core/auth/auth.guard';
import { ResponseInterceptor } from 'src/core/interceptor/response.interceptor';
import { CompanyDto } from '../company/dto/company.dto';
import { FileDto } from '../file/dto/file.dto';
import { CreateEditRoomDto } from './dto/create-edit-room.dto';
import { RoomDto } from './dto/room.dto';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get all rooms',
    type: RoomDto,
    isArray: true,
  })
  @UseInterceptors(
    new ResponseInterceptor(RoomDto, {
      company: {
        type: CompanyDto,
        logo: FileDto,
      },
    }),
  )
  async getRooms() {
    return this.roomService.getRooms();
  }

  @Get('visited-rooms')
  @ApiOkResponse({
    description: 'Get all visited escape rooms for the logged-in user',
    type: RoomDto,
    isArray: true,
  })
  @UseInterceptors(
    new ResponseInterceptor(RoomDto, {
      company: {
        type: CompanyDto,
        logo: FileDto,
      },
    }),
  )
  @IsAuthenticated([Role.USER, Role.ADMIN])
  async getVisitedRooms(@Req() req: RequestWithUser) {
    return this.roomService.getVisitedRooms(req.user.id);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Get one room by ID',
    type: RoomDto,
  })
  @UseInterceptors(
    new ResponseInterceptor(RoomDto, {
      company: {
        type: CompanyDto,
        logo: FileDto,
      },
    }),
  )
  async getRoomById(@Param('id') id: string) {
    return this.roomService.getRoomById(id);
  }

  @Get('company/:companyId')
  @ApiOkResponse({
    description: 'Get all rooms by company ID',
    type: RoomDto,
    isArray: true,
  })
  @UseInterceptors(
    new ResponseInterceptor(RoomDto, {
      company: {
        type: CompanyDto,
        logo: FileDto,
      },
    }),
  )
  async getRoomsByCompanyId(@Param('companyId') companyId: string) {
    return this.roomService.getRoomsByCompanyId(companyId);
  }

  @Post()
  @ApiOkResponse({
    description: 'Create a room',
    type: RoomDto,
  })
  @IsAuthenticated([Role.COMPANY, Role.ADMIN])
  async createRoom(@Body() room: CreateEditRoomDto) {
    return this.roomService.createRoom(room);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Update a room',
    type: RoomDto,
  })
  @IsAuthenticated([Role.COMPANY, Role.ADMIN])
  async updateRoom(@Param('id') id: string, @Body() room: CreateEditRoomDto) {
    return this.roomService.updateRoom(id, room);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete a room',
    type: RoomDto,
  })
  @IsAuthenticated([Role.COMPANY, Role.ADMIN])
  async deleteRoom(@Param('id') id: string) {
    return this.roomService.deleteRoom(id);
  }
}

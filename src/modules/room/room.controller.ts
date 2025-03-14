import { Body, Controller, Get, Param, Post, Put, Delete } from "@nestjs/common";
import { RoomService } from "./room.service";
import { CreateEditRoomDto } from "./dto/create-edit-room.dto";
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { RoomDto } from "./dto/room.dto";

@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) { }


    @Get()
    @ApiOkResponse({
        description: 'Get all rooms',
        type: RoomDto,
        isArray: true,
    })
    async getRooms() {
        return this.roomService.getRooms();
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'Get one room by ID',
        type: RoomDto,
        isArray: true,
    })
    async getRoomById(@Param('id') id: string) {
        return this.roomService.getRoomById(id);
    }

    @Post()
    @ApiOkResponse({
        description: 'Create a room',
        type: RoomDto,
    })
    async createRoom(@Body() room: CreateEditRoomDto) {
        return this.roomService.createRoom(room);
    }

    @Put(':id')
    @ApiOkResponse({
        description: 'Update a room',
        type: RoomDto,
    })
    async updateRoom(@Param('id') id: string, @Body() room: CreateEditRoomDto) {
        return this.roomService.updateRoom(id, room);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: 'Delete a room',
        type: RoomDto,
    })
    async deleteRoom(@Param('id') id: string) {
        return this.roomService.deleteRoom(id);
    }
}

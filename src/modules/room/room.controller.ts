import { Body, Controller, Get, Param, Post, Put, Delete } from "@nestjs/common";
import { RoomService } from "./room.service";
import { CreateEditRoomDto } from "./dto/create-edit-room.dto";


@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) { }


    @Get()
    async getRooms() {
        return this.roomService.getRooms();
    }

    @Get(':id')
    async getRoomById(@Param('id') id: string) {
        return this.roomService.getRoomById(id);
    }

    @Post()
    async createRoom(@Body() room: CreateEditRoomDto) {
        return this.roomService.createRoom(room);
    }

    @Put(':id')
    async updateRoom(@Param('id') id: string, @Body() room: CreateEditRoomDto) {
        return this.roomService.updateRoom(id, room);
    }

    @Delete(':id')
    async deleteRoom(@Param('id') id: string) {
        return this.roomService.deleteRoom(id);
    }
}

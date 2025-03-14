import { Body, Controller, Get, Param, Put, Req } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsAuthenticated } from 'src/core/auth/auth.decorator';
import { RequestWithUser } from 'src/core/auth/auth.guard';
import { TimeSlotDto } from './dto/time-slot.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { TimeSlotService } from './time-slot.service';

@Controller('time-slots')
export class TimeSlotController {
  constructor(private readonly timeSlotService: TimeSlotService) {}

  @Get(':roomId')
  @IsAuthenticated([Role.COMPANY, Role.ADMIN])
  @ApiOkResponse({
    description: 'The time slots for the room',
    type: TimeSlotDto,
    isArray: true,
  })
  async getTimeSlots(@Param('roomId') roomId: string) {
    return this.timeSlotService.getTimeSlots(roomId);
  }

  // @Post()
  // @IsAuthenticated([Role.COMPANY, Role.ADMIN])
  // async createTimeSlot(
  //   @Param('roomId') roomId: string,
  //   @Body() body: CreateTimeSlotDto,
  // ) {
  //   return this.timeSlotService.createTimeSlot(roomId, body);
  // }

  @Put(':timeSlotId/status')
  @ApiOkResponse({
    description: 'The time slot status',
    type: TimeSlotDto,
  })
  @IsAuthenticated([Role.COMPANY, Role.ADMIN])
  async updateStatus(
    @Param('timeSlotId') timeSlotId: string,
    @Body() body: UpdateStatusDto,
    @Req() req: RequestWithUser,
  ) {
    return this.timeSlotService.updateStatus(timeSlotId, body, req.user);
  }
}

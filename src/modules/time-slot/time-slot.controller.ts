import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsAuthenticated } from 'src/core/auth/auth.decorator';
import { TimeSlotDto } from './dto/time-slot.dto';
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
}

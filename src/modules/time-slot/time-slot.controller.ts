import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsAuthenticated } from 'src/core/auth/auth.decorator';
import { RequestWithUser } from 'src/core/auth/auth.guard';
import { CreateEditTimeSlotDto } from './dto/create-edit-time-slot.dto';
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

  @Post()
  @IsAuthenticated([Role.COMPANY, Role.ADMIN])
  async createTimeSlot(
    @Body() body: CreateEditTimeSlotDto,
    @Req() req: RequestWithUser,
  ) {
    return this.timeSlotService.createTimeSlot(body, req.user);
  }

  @Put(':timeSlotId')
  @IsAuthenticated([Role.COMPANY, Role.ADMIN])
  async updateTimeSlot(
    @Param('timeSlotId') timeSlotId: string,
    @Body() body: CreateEditTimeSlotDto,
    @Req() req: RequestWithUser,
  ) {
    return this.timeSlotService.updateTimeSlot(timeSlotId, body, req.user);
  }

  @Delete(':timeSlotId')
  @IsAuthenticated([Role.COMPANY, Role.ADMIN])
  async deleteTimeSlot(
    @Param('timeSlotId') timeSlotId: string,
    @Req() req: RequestWithUser,
  ) {
    return this.timeSlotService.deleteTimeSlot(timeSlotId, req.user);
  }
}

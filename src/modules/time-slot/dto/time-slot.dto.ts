import { ApiProperty } from '@nestjs/swagger';
import { WeekDay } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { MinimalRoomDto } from 'src/modules/room/dto/minimal-room.dto';

@Exclude()
export class MinimalTimeSlotDto {
  @Expose()
  @ApiProperty({
    description: 'The id of the time slot',
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'The start time of the time slot',
    example: '09:00',
  })
  start: string;

  @Expose()
  @ApiProperty({
    description: 'The end time of the time slot',
    example: '10:00',
  })
  end: string;

  @Expose()
  @ApiProperty({
    description: 'The day of the time slot',
    example: WeekDay.MONDAY,
    enum: WeekDay,
  })
  day: WeekDay;

  @Expose()
  @ApiProperty({
    description: 'The availability of the time slot',
    type: Boolean,
  })
  isAvailable: boolean;
}

@Exclude()
export class TimeSlotDto extends MinimalTimeSlotDto {
  @Expose()
  @ApiProperty({
    description: 'The room of the time slot',
    type: MinimalRoomDto,
  })
  room: MinimalRoomDto;
}

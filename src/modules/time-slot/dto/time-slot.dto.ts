import { ApiProperty } from '@nestjs/swagger';
import { WeekDay } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { RoomDto } from 'src/modules/room/dto/room.dto';

@Exclude()
export class TimeSlotDto {
  @Expose()
  @ApiProperty({
    description: 'The id of the time slot',
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'The start time of the time slot',
  })
  start: Date;

  @Expose()
  @ApiProperty({
    description: 'The end time of the time slot',
  })
  end: Date;

  @Expose()
  @ApiProperty({
    description: 'The day of the time slot',
    example: WeekDay.MONDAY,
    enum: WeekDay,
  })
  day: WeekDay;

  @Expose()
  @ApiProperty({
    description: 'The room of the time slot',
    type: RoomDto,
  })
  room: RoomDto;
}

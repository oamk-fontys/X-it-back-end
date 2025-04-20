import { ApiProperty } from '@nestjs/swagger';
import { BookingState } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { MinimalRoomDto } from 'src/modules/room/dto/minimal-room.dto';
import { MinimalTimeSlotDto } from 'src/modules/time-slot/dto/time-slot.dto';
import { MinimalUserDto } from 'src/modules/user/dto/minimal-user.dto';

@Exclude()
export class BookingDto {
  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The id of the booking',
    example: '1',
    type: String,
  })
  id: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The status of the booking',
    enum: BookingState,
    enumName: 'BookingState',
    example: BookingState.SCHEDULED,
  })
  state: BookingState;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The room',
    type: MinimalRoomDto,
  })
  room: MinimalRoomDto;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The time slot',
    type: MinimalTimeSlotDto,
  })
  timeSlot: MinimalTimeSlotDto;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The user',
    type: MinimalUserDto,
  })
  user: MinimalUserDto;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'created at booking',
    type: Date,
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'updated at booking',
    type: Date,
  })
  updatedAt: Date;
}

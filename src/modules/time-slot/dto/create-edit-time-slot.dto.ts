import { ApiProperty } from '@nestjs/swagger';
import { WeekDay } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsUUID, Matches } from 'class-validator';

@Exclude()
export class CreateEditTimeSlotDto {
  @ApiProperty({
    description: 'The day of the time slot',
    example: WeekDay.MONDAY,
    enum: WeekDay,
  })
  @IsNotEmpty()
  @IsEnum(WeekDay)
  @Expose()
  day: WeekDay;

  @ApiProperty({
    description: 'Start time in HH:mm format',
    example: '09:00',
  })
  @IsNotEmpty()
  @Expose()
  @Matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Start time must be in HH:mm format',
  })
  start: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  @IsUUID()
  roomId: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { TimeSlotStatus } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UpdateStatusDto {
  @Expose()
  @ApiProperty({
    description: 'The status of the time slot',
    enum: TimeSlotStatus,
  })
  status: TimeSlotStatus;
}

import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class BookingQrCodeDto {
  @Expose()
  @ApiProperty({
    description: 'The booking id',
  })
  bookingId: string;

  @Expose()
  @ApiProperty({
    description: 'The user id',
  })
  userId: string;
}

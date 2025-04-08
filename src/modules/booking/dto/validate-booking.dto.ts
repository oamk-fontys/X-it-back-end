import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ValidateBookingDto {
  @Expose()
  @ApiProperty({
    description: 'The token',
  })
  token: string;
}

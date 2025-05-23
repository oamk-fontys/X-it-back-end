import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { BookingDto } from 'src/modules/booking/dto/booking.dto';

@Exclude()
export class MinimalGameDto {
  @Expose()
  @ApiProperty({
    description: 'The unique ID of the game',
    example: 'a3320ee0-7b48-4119-8569-a7d142046fd1',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @Expose()
  @ApiProperty({
    description: 'The name of the team',
    example: 'Team A',
  })
  @IsString()
  @IsNotEmpty()
  teamName: string;

  @Expose()
  @ApiProperty({
    description: 'The ID of the room',
    example: '617949f8-0c4e-4bb8-b13b-c24fd5175f3b',
  })
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @Expose()
  @ApiProperty({
    description: 'The start time of the game',
    example: '2025-03-07T14:30:00Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  startTime?: string | null;

  @Expose()
  @ApiProperty({
    description: 'The end time of the game',
    example: '2025-03-07T16:00:00Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  endTime?: string | null;
}

@Exclude()
export class GameDto extends MinimalGameDto {
  @Expose()
  @IsString()
  @ApiProperty({
    description: 'The ID of the booking associated with this game',
    example: '617949f8-0c4e-4bb8-b13b-c24fd5175f3b',
    required: true,
  })
  booking: BookingDto;
}

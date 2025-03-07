import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Exclude()
export class GameDto {
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
    //uuid
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
  startTime?: string;

  @Expose()
  @ApiProperty({
    description: 'The end time of the game',
    example: '2025-03-07T16:00:00Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  endTime?: string;
}

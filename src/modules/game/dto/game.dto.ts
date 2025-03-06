import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsString, IsOptional, IsDateString } from "class-validator";

@Exclude()
export class GameDto {

  @Expose()
  @ApiProperty({
    description: 'The unique identifier of the game',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'The name of the team participating in the game',
    example: 'Team A',
    type: String,
  })
  teamName: string;

  @Expose()
  @ApiProperty({
    description: 'The ID of the room where the game takes place',
    example: 'room123',
    type: String,
  })
  roomId: string;

  @Expose()
  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'The start time of the game',
    example: '2025-03-15T10:00:00Z',
    type: String,
    required: false,
  })
  startTime?: Date;

  @Expose()
  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'The end time of the game',
    example: '2025-03-15T12:00:00Z',
    type: String,
    required: false,
  })
  endTime?: Date;

  @Expose()
  @ApiProperty({
    description: 'The timestamp when the game was created',
    example: '2025-03-01T08:00:00Z',
    type: String,
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The timestamp when the game was last updated',
    example: '2025-03-01T09:00:00Z',
    type: String,
  })
  updatedAt: Date;
}

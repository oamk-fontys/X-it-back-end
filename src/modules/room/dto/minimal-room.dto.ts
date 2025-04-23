import { ApiProperty } from '@nestjs/swagger';
import { Difficulty } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { FileDto } from 'src/modules/file/dto/file.dto';

@Exclude()
export class MinimalRoomDto {
  @Expose()
  @ApiProperty({
    description: 'room id',
    example: '617949f8-0c4e-4bb8-b13b-c24fd5175f3b',
    type: String,
  })
  id: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the room',
    example: 'Room One',
    type: String,
  })
  name: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The logo of the room',
    type: FileDto,
  })
  logo: FileDto;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The description of the room',
    example: 'This is room one',
    type: String,
  })
  description: string;

  @Expose()
  @ApiProperty({
    description: 'The duration of the room',
    example: 30,
    type: Number,
  })
  duration: number;

  @Expose()
  @ApiProperty({
    description: 'The cleanup time of the room',
    example: 10,
    type: Number,
  })
  cleanUpTime: number;

  @Expose()
  @ApiProperty({
    description: 'The difficulty of the room',
    example: Difficulty.EASY,
    enum: Difficulty,
  })
  difficulty: Difficulty;

  @Expose()
  @ApiProperty({
    description: 'The address of the room',
    example: '123 Main St',
    type: String,
  })
  address: string;

  @Expose()
  @ApiProperty({
    description: 'The city of the room',
    example: 'New York',
    type: String,
  })
  city: string;

  @Expose()
  @ApiProperty({
    description: 'The postal code of the room',
    example: '6001 RA',
    type: String,
  })
  postalCode: string;

  @Expose()
  @ApiProperty({
    description: 'The country of the room',
    example: 'United States',
    type: String,
  })
  country: string;

  @Expose()
  @ApiProperty({
    description: 'The phone number of the room',
    example: '+31 6 12345678',
    type: String,
  })
  phoneNumber: string;
}

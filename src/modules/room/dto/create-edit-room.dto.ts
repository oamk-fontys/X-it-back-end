import { ApiProperty } from '@nestjs/swagger';
import { Difficulty } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

@Exclude()
export class CreateEditRoomDto {
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
    description: 'The description of the room',
    example: 'This is room one',
    type: String,
  })
  description: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The id of the company',
    example: 'a3320ee0-7b48-4119-8569-a7d142046fd1',
    type: String,
  })
  companyId: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The duration of the room',
    example: 30,
    type: Number,
  })
  duration: number;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The cleanup time of the room',
    example: 10,
    type: Number,
  })
  cleanUpTime: number;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The difficulty of the room',
    example: Difficulty.EASY,
    enum: Difficulty,
  })
  difficulty: Difficulty;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The address of the room',
    example: '123 Main St',
    type: String,
  })
  address: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The city of the room',
    example: 'New York',
    type: String,
  })
  city: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The postal code of the room',
    example: '6001 RA',
    type: String,
  })
  postalCode: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The country of the room',
    example: 'United States',
    type: String,
  })
  country: string;

  @Expose()
  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty({
    description: 'The phone number of the room',
    example: '+31 6 12345678',
    type: String,
  })
  phoneNumber: string;
}

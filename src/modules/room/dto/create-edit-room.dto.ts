import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

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
}

import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { CompanyDto } from 'src/modules/company/dto/company.dto';

@Exclude()
export class RoomDto {
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
    description: 'The company of the room',
    type: CompanyDto,
  })
  company: CompanyDto;

  @Expose()
  @ApiProperty({
    description: 'room id',
    example: '617949f8-0c4e-4bb8-b13b-c24fd5175f3b',
    type: Number,
  })
  id: number;

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
}

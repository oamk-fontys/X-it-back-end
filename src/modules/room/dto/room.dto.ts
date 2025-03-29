import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { CompanyDto } from 'src/modules/company/dto/company.dto';
import { MinimalRoomDto } from './minimal-room.dto';

@Exclude()
export class RoomDto extends MinimalRoomDto {
  @Expose()
  @ApiProperty({
    description: 'The company of the room',
    type: CompanyDto,
  })
  company: CompanyDto;
}

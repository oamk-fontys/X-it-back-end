import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDate } from 'class-validator';
import { CompanyDto } from 'src/modules/company/dto/company.dto';
import { MinimalUserDto } from './minimal-user.dto';

@Exclude()
export class UserDto extends MinimalUserDto {
  @Expose()
  @ApiProperty({
    description: 'The creation date of the user',
  })
  @IsDate()
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The last update date of the user',
  })
  @IsDate()
  updatedAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The company of the user',
    type: CompanyDto,
  })
  company: CompanyDto;
}

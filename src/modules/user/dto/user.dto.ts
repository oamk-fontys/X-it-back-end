import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsEnum } from 'class-validator';
import { CompanyDto } from 'src/modules/company/dto/company.dto';
import { MinimalUserDto } from './minimal-user.dto';

@Exclude()
export class UserDto extends MinimalUserDto {
  @Expose()
  @ApiProperty({
    description: 'The date of birth of the user',
    example: '1990-01-01',
  })
  @IsDate()
  dateOfBirth: Date;

  @Expose()
  @ApiProperty({
    description: 'The role of the user',
    enum: Role,
    example: Role.USER,
  })
  @IsEnum(Role)
  role: Role;

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

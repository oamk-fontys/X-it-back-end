import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsDateString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateEditCompanyDto } from 'src/modules/company/dto/create-edit-company.dto';
import { SignInDto } from './sign-in.dto';

@Exclude()
export class RegisterDto extends SignInDto {
  @Expose()
  @IsString()
  @ApiProperty({
    description: 'The confirmation password of the user',
    example: 'password123',
  })
  confirmPassword: string;

  @Expose()
  @IsString()
  @ApiProperty({
    description: 'The username of the user',
    example: 'johndoe',
  })
  username: string;

  @Expose()
  @IsString()
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  firstName: string;

  @Expose()
  @IsString()
  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  lastName: string;

  @Expose()
  @IsPhoneNumber()
  @ApiProperty({
    description: 'The phone number of the user',
    example: '+31 6 12345678',
  })
  phoneNumber: string;

  @Expose()
  @IsDateString()
  @ApiProperty({
    description: 'The date of birth of the user',
    example: '2017-06-07T14:34:08.700Z',
  })
  dateOfBirth: Date;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @ApiProperty({
    description: 'The company of the user',
    type: CreateEditCompanyDto,
    nullable: true,
  })
  @Type(() => CreateEditCompanyDto)
  company: CreateEditCompanyDto;
}

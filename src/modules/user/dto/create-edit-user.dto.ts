import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

@Exclude()
export class CreateEditUserDto {
  @Expose()
  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @Expose()
  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsString()
  password: string;

  @Expose()
  @ApiProperty({
    description: 'The username of the user',
    example: 'johndoe',
  })
  @IsString()
  username: string;

  @Expose()
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @IsString()
  firstName: string;

  @Expose()
  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  @IsString()
  lastName: string;

  @Expose()
  @ApiProperty({
    description: 'The phone number of the user',
    example: '+1234567890',
  })
  @IsPhoneNumber()
  phoneNumber: string;

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
    description: 'The file id of the user profile picture',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  profilePictureId: string;
}

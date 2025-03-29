import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

@Exclude()
export class MinimalUserDto {
  @Expose()
  @ApiProperty({
    description: 'The ID of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  id: string;

  @Expose()
  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

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
}

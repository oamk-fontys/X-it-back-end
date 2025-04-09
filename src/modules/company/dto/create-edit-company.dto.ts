import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

@Exclude()
export class CreateEditCompanyDto {
  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the company',
    example: 'Jumbo',
    type: String,
  })
  name: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The address of the company',
    example: 'Rachelsmolen 1, 5612 MA Eindhoven',
    type: String,
  })
  address: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The owner',
    example: '76dcdb77-5522-4deb-b8ba-8bc4b16892a3',
    type: String,
  })
  ownerId: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The city of the company',
    example: 'Amsterdam',
    type: String,
  })
  city: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The postal code of the company',
    example: '5612 MA',
    type: String,
  })
  postalCode: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The vat of the company',
    example: '12345678',
    type: String,
  })
  vat: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The description of the company',
    example: 'This is a company',
    type: String,
  })
  description: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'verification status of the company',
    example: true,
    type: Boolean,
  })
  verified: boolean;

  @Expose()
  @IsOptional()
  @ApiProperty({
    description: 'The file id of the company logo',
    type: String,
    nullable: true,
  })
  logoId: string;
}

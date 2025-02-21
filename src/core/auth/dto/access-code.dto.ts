import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

@Exclude()
export class AccessCodeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(6)
  @Expose()
  @ApiProperty({
    description: 'The access code to sign in',
    example: '123456',
  })
  accessCode: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  @IsUUID()
  @ApiProperty({
    description: 'The current id of the company',
    example: '06462018-353c-46d1-bff8-2f7e9350d20c',
  })
  companyId: string;
}

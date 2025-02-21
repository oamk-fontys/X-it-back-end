import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

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
}

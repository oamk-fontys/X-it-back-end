import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AccessTokenDto {
  @Expose()
  @ApiProperty({
    description: 'The token',
  })
  access_token: string;
}

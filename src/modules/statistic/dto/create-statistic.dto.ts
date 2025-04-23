import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsUUID } from 'class-validator';

export class CreateStatisticDto {
  @Expose()
  @ApiProperty({
    description: 'The number of hints used',
  })
  @IsNumber()
  hintsUsed: number;

  @Expose()
  @ApiProperty({
    description: 'The game id',
  })
  @IsUUID()
  gameId: string;
}

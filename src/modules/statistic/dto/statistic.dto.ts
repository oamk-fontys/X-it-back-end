import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { MinimalGameDto } from 'src/modules/game/dto/game.dto';
import { CreateStatisticDto } from './create-statistic.dto';

@Exclude()
export class StatisticDto extends CreateStatisticDto {
  @Expose()
  @ApiProperty({
    description: 'The score of the game',
  })
  score: number;

  @Expose()
  @ApiProperty({
    description: 'The time of completion of the game in milliseconds',
  })
  timeOfCompletion: number;

  @Expose()
  @ApiProperty({
    description: 'The game',
  })
  game: MinimalGameDto;
}

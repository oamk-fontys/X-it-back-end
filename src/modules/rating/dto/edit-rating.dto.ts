import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@Exclude()
export class EditRatingDto {
    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The rating value',
        example: '5',
        type: Number,
    })
    rating: number;

}

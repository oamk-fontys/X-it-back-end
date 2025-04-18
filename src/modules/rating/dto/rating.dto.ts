import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { MinimalUserDto } from 'src/modules/user/dto/minimal-user.dto';

Exclude();
export class RatingDto {
    @Expose()
    @ApiProperty({
        description: 'rating id',
        example: '7b04bc7a-334f-46d3-8709-1e19cb744680',
        type: String,
    })
    id: string;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The rating value',
        example: '5',
        type: Number,
    })
    rating: number;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The user who made the comment',
        type: MinimalUserDto,
    })
    user: MinimalUserDto;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The date when the rating was created',
        type: Date,
    })
    createdAt: Date;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The date when the rating was last updated',
        type: Date,
    })
    updatedAt: Date;
}

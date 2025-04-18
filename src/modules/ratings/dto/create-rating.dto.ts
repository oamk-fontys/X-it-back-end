import { E } from '@faker-js/faker/dist/airline-BXaRegOM';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { EditCommentDto } from 'src/modules/comment/dto/edit-comment.dto';

@Exclude()
export class CreateRatingDto extends EditCommentDto {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        description: 'The room to which the Rating belongs',
        example: '7b04bc7a-334f-46d3-8709-1e19cb744680',
        type: String,
    })
    roomId: string;
}

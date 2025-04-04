import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';

@Exclude()
export class CreateEditCommentDto {
    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The text of the comment',
        example: 'This is a comment',
        type: String,
    })
    commentText: string;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The user who made the comment',
        example: '98b98e99-8aae-4217-979a-1abf64774ade',
        type: String,
    })
    userId: string;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The room to which the comment belongs',
        example: '7b04bc7a-334f-46d3-8709-1e19cb744680',
        type: String,
    })
    roomId: string;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The text will contain spoilers',
        example: 'true',
        type: Boolean,
    })
    isSpoiler: Boolean;
}

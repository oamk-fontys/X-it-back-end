import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { CommentType } from '@prisma/client';

@Exclude()
export class CreateEditCommentDto {
    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The content of the comment',
        example: 'This is a comment',
        type: String,
    })
    content: string;

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
    @IsEnum(CommentType)
    @ApiProperty({
        description: 'Specifies whether the comment contains spoilers or not',
        example: 'WITH_SPOILER',
        enum: CommentType,
    })
    commentType: CommentType;
}

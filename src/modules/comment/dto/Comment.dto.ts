import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

Exclude()
export class CommentDto {
    @Expose()
    @ApiProperty({
        description: 'comment id',
        example: '7b04bc7a-334f-46d3-8709-1e19cb744680',
        type: String,
    })
    id: string;

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
    @IsNotEmpty()
    @ApiProperty({
        description: 'The date when the comment was created',
        example: '2023-10-01T12:00:00Z',
        type: String,
    })
    createdAt: Date;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The date when the comment was last updated',
        example: '2023-10-01T12:00:00Z',
        type: String,
    })
    updatedAt: Date;
}
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { EditCommentDto } from './edit-comment.dto';

@Exclude()
export class CreateCommentDto extends EditCommentDto {
  @Expose()
  @IsNotEmpty()
  @IsUUID()
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
    type: Boolean,
  })
  isSpoiler: boolean;
}

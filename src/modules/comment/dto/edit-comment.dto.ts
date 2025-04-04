import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@Exclude()
export class EditCommentDto {
  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The text of the comment',
    example: 'This is a comment',
    type: String,
  })
  content: string;
}

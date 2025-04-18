import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { MinimalRoomDto } from 'src/modules/room/dto/minimal-room.dto';
import { MinimalUserDto } from 'src/modules/user/dto/minimal-user.dto';

@Exclude()
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
    description: 'The text of the comment',
    example: 'This is a comment',
    type: String,
  })
  content: string;

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
    description: 'The user who made the comment',
    type: MinimalRoomDto,
  })
  room: MinimalRoomDto;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The date when the comment was created',
    type: Date,
  })
  createdAt: Date;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The date when the comment was last updated',
    type: Date,
  })
  updatedAt: Date;
}

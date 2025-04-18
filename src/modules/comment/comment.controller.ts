import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Post,
  Put,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsAuthenticated } from 'src/core/auth/auth.decorator';
import { RequestWithUser } from 'src/core/auth/auth.guard';
import { ResponseInterceptor } from 'src/core/interceptor/response.interceptor';
import { MinimalRoomDto } from '../room/dto/minimal-room.dto';
import { MinimalUserDto } from '../user/dto/minimal-user.dto';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/Comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { EditCommentDto } from './dto/edit-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get all comments',
    type: CommentDto,
    isArray: true,
  })
  @UseInterceptors(
    new ResponseInterceptor(CommentDto, {
      user: MinimalUserDto,
      room: MinimalRoomDto,
    }),
  )
  async getFeaturedComments() {
    return this.commentService.getFeaturedComments();
  }

  @Get(':roomId')
  @ApiOkResponse({
    description: 'Get all comments',
    type: CommentDto,
    isArray: true,
  })
  @ApiQuery({
    name: 'isSpoiler',
    type: Boolean,
    required: true,
  })
  @UseInterceptors(
    new ResponseInterceptor(CommentDto, {
      user: MinimalUserDto,
      room: MinimalRoomDto,
    }),
  )
  async getComments(
    @Param('roomId') roomId: string,
    @Query('isSpoiler', ParseBoolPipe) isSpoiler: boolean,
  ) {
    return this.commentService.getComments(roomId, isSpoiler);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Get one comment by ID',
    type: CommentDto,
  })
  @UseInterceptors(
    new ResponseInterceptor(CommentDto, {
      user: MinimalUserDto,
      room: MinimalRoomDto,
    }),
  )
  async getCommentById(@Param('id') id: string) {
    return this.commentService.getCommentById(id);
  }

  @Post()
  @ApiOkResponse({
    description: 'Create a comment',
    type: CommentDto,
  })
  @IsAuthenticated([Role.USER, Role.ADMIN])
  @UseInterceptors(
    new ResponseInterceptor(CommentDto, {
      user: MinimalUserDto,
      room: MinimalRoomDto,
    }),
  )
  async createComment(
    @Body() body: CreateCommentDto,
    @Req() request: RequestWithUser,
  ) {
    return this.commentService.createComment(body, request.user.id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Update a comment',
    type: CommentDto,
  })
  @IsAuthenticated([Role.USER, Role.ADMIN])
  @UseInterceptors(
    new ResponseInterceptor(CommentDto, {
      user: MinimalUserDto,
      room: MinimalRoomDto,
    }),
  )
  async updateComment(
    @Param('id') id: string,
    @Body() body: EditCommentDto,
    @Req() request: RequestWithUser,
  ) {
    return this.commentService.updateComment(id, body, request.user.id);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete a comment',
    type: CommentDto,
  })
  @IsAuthenticated([Role.USER, Role.ADMIN])
  @UseInterceptors(
    new ResponseInterceptor(CommentDto, {
      user: MinimalUserDto,
      room: MinimalRoomDto,
    }),
  )
  async deleteComment(
    @Param('id') id: string,
    @Req() request: RequestWithUser,
  ) {
    return this.commentService.deleteComment(id, request.user.id);
  }
}

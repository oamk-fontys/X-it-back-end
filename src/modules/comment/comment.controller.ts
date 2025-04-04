import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsAuthenticated } from 'src/core/auth/auth.decorator';
import { ResponseInterceptor } from 'src/core/interceptor/response.interceptor';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/Comment.dto';
import { CreateEditCommentDto } from './dto/create-edit-comment.dto';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @Get()
    @ApiOkResponse({
        description: 'Get all comments',
        type: CommentDto,
        isArray: true,
    })
    @UseInterceptors(new ResponseInterceptor(CommentDto))
    async getComments() {
        return this.commentService.getComments();
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'Get one comment by ID',
        type: CommentDto,
    })
    async getCommentById(@Param('id') id: string) {
        return this.commentService.getCommentById(id);
    }

    @Post()
    @ApiOkResponse({
        description: 'Create a comment',
        type: CommentDto,
    })
    @IsAuthenticated([Role.USER, Role.ADMIN])
    async createComment(@Body() body: CreateEditCommentDto) {
        return this.commentService.createComment(body);
    }

    @Put(':id')
    @ApiOkResponse({
        description: 'Update a comment',
        type: CommentDto,
    })
    @IsAuthenticated([Role.USER, Role.ADMIN])
    async updateComment(@Param('id') id: string, @Body() body: CreateEditCommentDto) {
        return this.commentService.updateComment(id, body);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: 'Delete a comment',
        type: CommentDto,
    })
    @IsAuthenticated([Role.ADMIN])
    async deleteComment(@Param('id') id: string) {
        return this.commentService.deleteComment(id);
    }
}

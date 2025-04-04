import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateEditCommentDto } from "./dto/create-edit-comment.dto";
import { CommentService } from "./comment.service";

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }


    @Get()
    async getComments() {
        return this.commentService.getComments();
    }

    @Get(':id')
    async getCommentById(@Param('id') id: string) {
        return this.commentService.getCommentById(id);
    }

    @Post()
    async createComment(@Body() comment: CreateEditCommentDto) {
        return this.commentService.createComment(comment);
    }

    @Put(':id')
    async updateComment(@Param('id') id: string, @Body() comment: CreateEditCommentDto) {
        return this.commentService.updateComment(id, comment);
    }

    @Delete(':id')
    async deleteComment(@Param('id') id: string) {
        return this.commentService.deleteComment(id);
    }
}

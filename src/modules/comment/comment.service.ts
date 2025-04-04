import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma.service";
import { CreateEditCommentDto } from "./dto/create-edit-comment.dto";

@Injectable()
export class CommentService {

    constructor(private readonly prisma: PrismaService) { }



    public async getComments() {
        return await this.prisma.comment.findMany();
    }

    public async getCommentById(id: string) {
        const comment = await this.prisma.comment.findUnique({
            where: { id },
        });

        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        return comment;
    }

    public async createComment(body: CreateEditCommentDto) {
        if (body.userId) {
            const user = await this.prisma.user.findUnique({
                where: { id: body.userId },
            });

            if (!user) {
                throw new NotFoundException('User not found');
            }
        }
        if (body.roomId) {
            const room = await this.prisma.room.findUnique({
                where: { id: body.roomId },
            });

            if (!room) {
                throw new NotFoundException('Room not found');
            }
        }
        const newComment = await this.prisma.comment.create({
            data: {
                ...body,
                commentText: body.content
            },
        });

        return newComment;
    }

    public async updateComment(id: string, body: CreateEditCommentDto) {
        const commentToUpdate = await this.prisma.comment.findUnique({
            where: { id },
        });

        if (!commentToUpdate) {
            throw new NotFoundException('Comment not found');
        }

        return await this.prisma.comment.update({
            where: { id },
            data: {
                ...body
            },
        });
    }

    public async deleteComment(id: string) {
        const commentToDelete = await this.prisma.comment.findUnique({
            where: { id },
        });

        if (!commentToDelete) {
            throw new NotFoundException('Comment not found');
        }

        return await this.prisma.comment.delete({
            where: { id },
        });
    }
}

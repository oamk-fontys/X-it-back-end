import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { EditCommentDto } from './dto/edit-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  public async getComments(roomId: string, isSpoiler: boolean) {
    return await this.prisma.comment.findMany({
      where: {
        roomId,
        isSpoiler,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    });
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

  public async createComment(body: CreateCommentDto, userId: string) {
    const room = await this.prisma.room.findUnique({
      where: { id: body.roomId },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    const newComment = await this.prisma.comment.create({
      data: {
        ...body,
        userId,
      },
    });

    return newComment;
  }

  public async updateComment(id: string, body: EditCommentDto, userId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to update this comment',
      );
    }

    return await this.prisma.comment.update({
      where: { id },
      data: {
        ...body,
      },
    });
  }

  public async deleteComment(id: string, userId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to delete this comment',
      );
    }

    return await this.prisma.comment.delete({
      where: { id },
    });
  }

  public async getFeaturedComments() {
    return await this.prisma.comment.findMany({
      where: {
        isSpoiler: false,
      },
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
        room: true,
      },
    });
  }
}

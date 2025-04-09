import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { RegisterDto } from 'src/core/auth/dto/register.dto';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateEditUserDto } from './dto/create-edit-user.dto';
import { defaultUserSelect } from './select/user.select';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async getUsers() {
    return this.prisma.user.findMany({
      select: defaultUserSelect,
    });
  }

  public async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: defaultUserSelect,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async createUser(body: RegisterDto) {
    const { confirmPassword, ...userData } = body;

    return this.prisma.user.create({
      data: {
        ...userData,
        password: await hash(body.password, 10),
        company: body.company
          ? {
              create: {
                ...body.company,
                logoId: body.company.logoId ?? null,
              },
            }
          : undefined,
      },
    });
  }

  public async updateUser(id: string, user: CreateEditUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id },
      data: user,
    });
  }

  public async deleteUser(id: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }

  //
  public async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  public async getUserByAccessCode(accessCode: string) {
    return await this.prisma.user.findUnique({
      where: { accessCode },
      select: defaultUserSelect,
    });
  }

  public async doesUserExist(email: string, username?: string) {
    return (
      (await this.prisma.user.count({
        where: { OR: [{ email }, { username }] },
      })) > 0
    );
  }
}

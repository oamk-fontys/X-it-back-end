import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma.service";
import { CreateEditUserDto } from "./dto/create-edit-user.dto";

@Injectable()
export class UserService {
  
 
  constructor(private readonly prisma: PrismaService) {}


  public async getUsers() {
    return this.prisma.user.findMany();
  }


  public async getUserById(id: string) {
    const user =  this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async createUser(user: CreateEditUserDto) {
    return this.prisma.user.create({
      data: user,
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
}

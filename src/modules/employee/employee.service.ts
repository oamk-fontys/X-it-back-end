import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/core/database/prisma.service';
import { AddEmployeeDto } from './dto/add-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async getEmployees(companyId: string) {
    const company = await this.prisma.company.findUnique({
      where: {
        id: companyId,
      },
      include: {
        users: true,
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return company.users;
  }

  async createEmployee(companyId: string, body: AddEmployeeDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: body.userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.companyId) {
      throw new ForbiddenException('User is already part of a company');
    }

    await this.prisma.user.update({
      where: { id: body.userId },
      data: { companyId, role: Role.COMPANY },
    });
  }

  async deleteEmployee(companyId: string, id: string) {
    const employee = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    if (employee.companyId !== companyId) {
      throw new ForbiddenException('User is not part of this company');
    }

    await this.prisma.user.update({
      where: { id },
      data: { companyId: null, role: Role.USER },
    });
  }
}
